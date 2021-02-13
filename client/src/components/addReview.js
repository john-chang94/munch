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
        files: '',
        url: '',
        modalIsOpen: false,
        submitLoading: false
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
        this.setState({ files: e.target.files })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ submitLoading: true })
        const { rating, details, files } = this.state;
        const user_id = this.props.user.user_id;
        const restaurant_id = parseInt(this.props.match.params.restaurant_id); // Must be INT in db
        const body = { restaurant_id, user_id, rating, details, date: moment(Date.now()).format('yyyy-MM-DD') };

        // Add review to db
        await this.props.addReview(body);

        // Stop submit if any errors from review upload
        if (this.props.reviewError) {
            M.toast({ html: this.props.reviewError, classes: "red darken-1" })
            this.setState({ submitLoading: false })
            return this.props.clear(); // Clear reviewError in redux store
        }

        // Run success message and refresh if there are no images to upload
        if (!files) {
            M.toast({ html: 'Review submit success!', classes: "light-blue darken-2" })
            this.setState({
                details: '',
                submitLoading: false
            })
            this.renderEmptyStars();
            // Refresh review list
            this.props.fetchReviewsForRestaurant(restaurant_id);
        }

        // Run if there are images to upload
        if (files) {
            this.uploadImages(files, restaurant_id, user_id);
        }
    }

    uploadImages = async (files, restaurant_id, user_id) => {
        for (let i = 0; i < files.length; i++) {
            // Upload image to firebase storage
            const uploadTask = storage.ref(`/images/reviews/${files[i].name}`).put(files[i]);
            uploadTask.on('state_changed', console.log, console.error, () => {
                storage
                    .ref('images/reviews') // Reference review images folder location
                    .child(files[i].name) // Child is the level inside /reviews directory
                    .getDownloadURL() // Fetch image URL from firebase
                    .then(async (url) => {
                        const imageBody = {
                            restaurant_id,
                            user_id,
                            review_id: this.props.review.review_id,
                            image_url: url
                        }
                        // Add image url to pg with required foreign keys
                        await this.props.addReviewImage(imageBody);

                        // Update page once loop is done
                        if (i === files.length - 1) {
                            setTimeout(() => {
                                // Update reviews and images
                                this.props.fetchReviewsForRestaurant(restaurant_id);
                                this.props.fetchImagesForRestaurant(restaurant_id);

                                // Show success message and clear form
                                M.toast({ html: 'Review submit success!', classes: "light-blue darken-2" });
                                this.setState({
                                    details: '',
                                    submitLoading: false
                                })
                                this.renderEmptyStars();
                            }, 1200);
                        }
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
        const { details, stars, modalIsOpen, submitLoading } = this.state;
        const { user, userHasReview } = this.props;
        return (
            <div>
                {
                    user
                        ? <div className="bg-x-light-gray pt-2 pb-3 pl-2 pr-2">
                            {
                                userHasReview
                                    ? <div>
                                        <p>Edit your review</p>
                                    </div>
                                    : <div>
                                        <p>Leave a review</p>
                                        <p>{stars}</p>
                                    </div>
                            }

                            <form onSubmit={this.handleSubmit} >
                                <div className="input-field">
                                    <textarea
                                        className="materialize-textarea"
                                        id="details"
                                        value={details}
                                        onChange={this.handleChange}
                                        disabled={userHasReview}
                                    >
                                    </textarea>
                                    <label htmlFor="details">Details</label>
                                </div>
                                <div>
                                    <p>Add photos (optional)</p>
                                    <input type="file" onChange={this.handleImage} multiple disabled={userHasReview}/>
                                </div>
                                <div className="mt-1">
                                    <button className="btn" disabled={submitLoading || userHasReview}>{submitLoading ? 'Submitting...' : 'Submit'}</button>
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
        reviewError: state.review.reviewError,
        userHasReview: state.review.userHasReview
    }
}

export default withRouter(connect(mapStateToProps, actions)(AddReview));