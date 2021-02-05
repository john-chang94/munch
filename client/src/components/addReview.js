import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { storage } from '../config/fb';
import moment from 'moment';
import M from 'materialize-css';
import SignInModal from './SignInModal';

class AddReview extends Component {
    state = {
        stars: [],
        rating: '',
        details: '',
        file: '',
        url: '',
        modalIsOpen: false
    }

    componentDidMount() {
        // Initial render empty stars for leaving a review
        this.renderEmptyStars();
    }

    renderEmptyStars = () => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <i className="far fa-star yellow-text text-darken-2 pointer"
                    key={i}
                    onClick={() => this.handleRating(i)}>
                </i>
            )
        }
        this.setState({ stars })
    }

    handleRating = starIndex => {
        // Font Awesome & Materialize classes for filled and empty stars
        const filled = 'fas fa-star yellow-text text-darken-2 pointer';
        const empty = 'far fa-star yellow-text text-darken-2 pointer';
        let stars = [];

        for (let i = 0; i < 5; i++) {
            // If the selected star index is >= current loop index,
            // add a filled star, otherwise add an empty star
            stars.push(
                <i className={starIndex >= i
                    ? filled
                    : empty}
                    key={i}
                    onClick={() => this.handleRating(i)}>
                </i>
            )
        }

        this.setState({
            rating: starIndex + 1, // Rating must be from 1 to 5
            stars
        })
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleImage = e => {
        this.setState({ file: e.target.files[0] })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { rating, details, file } = this.state;
        const { userId } = this.props.user;
        const restaurantId = parseInt(this.props.match.params.restaurantId); // Must be INT in db
        const body = { restaurantId, userId, rating, details, date: moment(Date.now()).format('yyyy-MM-DD') };

        // Add review to db
        await this.props.addReview(body);

        if (this.props.reviewError) {
            M.toast({ html: this.props.reviewError, classes: "red darken-1" })
            return this.props.clear(); // Clear reviewError in redux store
        }

        // Run if no image upload
        if (!file) {
            M.toast({ html: 'Review submit success!', classes: "light-blue darken-2" })
            this.setState({ details: '' })
            this.renderEmptyStars();
            // Refresh review list
            this.props.fetchReviewsForRestaurant(restaurantId);
        }

        // Add image to firebase
        if (file) {
            // Reference images folder in firebase storage
            const uploadTask = storage.ref(`/images/${file.name}`).put(file);
            uploadTask.on('state_changed', console.log, console.error, () => {
                storage
                    .ref('images') // Images folder in firebase storage
                    .child(file.name) // Child is the level inside images directory
                    .getDownloadURL() // Fetch image URL from firebase
                    .then(async (url) => {
                        const imageBody = {
                            restaurantId,
                            userId,
                            reviewId: this.props.review.reviewId,
                            url
                        }
                        // Add image url to db with required foreign keys
                        await this.props.addReviewImage(imageBody);

                        // Show success message and clear form
                        M.toast({ html: 'Review submit success!', classes: "light-blue darken-2" });
                        this.setState({ details: '' })
                        this.renderEmptyStars();

                        // Refresh review list
                        this.props.fetchReviewsForRestaurant(restaurantId);
                    });
            });
        }
    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }

    render() {
        const { details, stars, modalIsOpen } = this.state;
        const { user } = this.props;
        return (
            <div>
                {
                    user
                        ? <div className="bg-x-light-gray pt-2 pb-3 pl-2 pr-2">
                            <p>Leave a review</p>
                            <div>
                                <p>{stars}</p>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-field">
                                    <textarea className="materialize-textarea" id="details" value={details} onChange={this.handleChange}></textarea>
                                    <label htmlFor="details">Details</label>
                                </div>
                                <div>
                                    <p>Add a photo (optional)</p>
                                    <input type="file" onChange={this.handleImage} />
                                </div>
                                <div className="mt-1">
                                    <button className="btn">Submit</button>
                                </div>
                            </form>
                        </div>
                        : <p><span className="blue-text pointer" onClick={this.openModal}>Sign in</span> to leave a review.</p>
                }

                <SignInModal
                    modalIsOpen={modalIsOpen}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        review: state.review.review,
        reviewError: state.review.reviewError
    }
}

export default withRouter(connect(mapStateToProps, actions)(AddReview));