import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/reviewActions';
import { storage } from '../config/fb';
import moment from 'moment';

class AddReview extends Component {
    state = {
        rating: '',
        details: '',
        file: '',
        url: '',
        stars: []
    }

    componentDidMount() {
        // Initial render emtpy stars for leaving a review
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <i className="far fa-star yellow-text text-darken-2"
                    key={i}
                    onClick={() => this.handleRating(i)}>
                </i>
            )
        }
        this.setState({ stars })
    }

    handleRating = (starIndex) => {
        // Materialize classes for filled and empty stars
        const filled = 'fas fa-star yellow-text text-darken-2';
        const empty = 'far fa-star yellow-text text-darken-2';
        let stars = [];

        for (let i = 0; i < 5; i++) {
            // If the selected star index is >= current loop index,
            // add a filled star, otherwise add an empty star
            stars.push(<i className={starIndex >= i ? filled : empty} key={i} onClick={() => this.handleRating(i)}></i>)
        }
        this.setState({
            rating: starIndex + 1, // Rating must be from 1 to 5
            stars
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleImage = e => {
        this.setState({
            file: e.target.files[0]
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { rating, details, file } = this.state;
        const { user_id } = this.props.user;
        const restaurant_id = parseInt(this.props.match.params.restaurant_id);
        const body = { restaurant_id, user_id, rating, details, date: moment(Date.now()).format('yyyy-MM-DD') };

        // Add review to db
        await this.props.addReview(body);
        
        // Reference images folder in firebase storage
        const uploadTask = storage.ref(`/images/${file.name}`).put(file);
        uploadTask.on('state_changed', console.log, console.error, () => {
            storage
                .ref('images') // Images folder in firebase storage
                .child(file.name) // Child is the level inside images directory
                .getDownloadURL() // Fetch image URL from firebase
                .then((url) => {
                    this.setState({
                        file: null,
                        url
                    })
                    const imageBody = {
                        restaurant_id,
                        user_id,
                        review_id: this.props.review.review_id,
                        url
                    }
                    // Add iamge to db with required foreign keys
                    this.props.addReviewImage(imageBody);
                });
        });
    }

    render() {
        const { details, url, stars } = this.state;
        return (
            <div>
                <p>Leave a review</p>
                <div>
                    <p>{stars}</p>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <textarea className="materialize-textarea" id="details" value={details} onChange={this.handleChange}></textarea>
                            <label htmlFor="details">Details</label>
                        </div>
                        <div>
                            <p>Add a photo</p>
                            <input type="file" onChange={this.handleImage} />
                        </div>
                        <div>
                            <button className="btn">Submit</button>
                        </div>
                    </form>
                    <img src={url} className="w-100" alt="" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        review: state.review.review
    }
}

export default withRouter(connect(mapStateToProps, actions)(AddReview));