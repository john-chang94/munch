import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';
import M from 'materialize-css';
import { storage } from '../config/fb';
import moment from 'moment';

class EditReview extends React.Component {
    state = {
        stars: [],
        rating: '',
        details: '',
        files: '',
        submitLoading: false
    }

    async componentDidMount() {
        await this.props.fetchReview(this.props.match.params.review_id);
        await this.setState({
            details: this.props.review.details,
            rating: this.props.review.rating
        })
        await this.renderStars(this.props.review.rating);
        M.updateTextFields();
    }

    // Different from renderStars helper because stars
    // have onChange effect to edit the rating if needed
    renderStars = (rating) => {
        let stars = [];
        for (let i = 1; i < 6; i++) {
            if (i <= rating) {
                // Add a whole star
                // Key is required because stars gets rendered as an array in components
                stars.push(<i className="fas fa-star yellow-text text-darken-2 pointer" key={i} onClick={() => this.handleRating(i)}></i>)
                // Add a half star if rating is a decimal and is equal to current loop index
            } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                stars.push(<i className="fas fa-star-half-alt yellow-text text-darken-2 pointer" key={i} onClick={() => this.handleRating(i)}></i>)
            } else {
                // Add an empty star
                stars.push(<i className="far fa-star yellow-text text-darken-2 pointer" key={i} onClick={() => this.handleRating(i)}></i>)
            }
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

    deleteImage = image => {
        const confirmDelete = window.confirm('Delete image?');
        if (confirmDelete) {
            // Ref image in fb based on its URL
            const deleteTask = storage.refFromURL(image[1]).delete()
                .then(async () => {
                    // image[0] contains the review_images_id
                    await this.props.deleteReviewImage(image[0]);
                    await this.props.fetchReview(this.props.review.review_id);
                    M.toast({ html: 'Image deleted successfully', classes: 'light-blue darken-2' })
                }).catch(err => {
                    console.log(err);
                })
        }
    }

    // REVIEW ID IS CHANGING WHEN CALLED HERE FOR SOME UNKNOWN STUPID REASON
    uploadImages = async (files, review_id, restaurant_id, user_id) => {
        for (let i = 0; i < files.length; i++) {
            // Upload image to firebase storage
            const uploadTask = storage.ref(`/images/reviews/${files[i].name}`).put(files[i]);
            uploadTask.on('state_changed', console.log, console.error, () => {
                storage
                    .ref('images/reviews') // Reference review images folder location
                    .child(files[i].name) // Child is the level inside /reviews directory
                    .getDownloadURL() // Fetch image URL from firebase
                    .then(async (url) => {
                        const imageBody = { restaurant_id, user_id, review_id, image_url: url }
                        // Add image url to db with required foreign keys
                        await this.props.addReviewImage(imageBody);

                        // Update page once loop is done
                        if (i === files.length - 1) {
                            setTimeout(async () => {
                                // Update view
                                await this.props.fetchReview(review_id);

                                // Show success message and update component state
                                M.toast({ html: 'Review update success!', classes: "light-blue darken-2" });
                                await this.setState({
                                    details: this.props.review.details,
                                    rating: this.props.review.rating,
                                    submitLoading: false
                                })

                                M.updateTextFields();
                            }, 1200);
                        }
                    });
            });
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ submitLoading: true })
        const { rating, details, files } = this.state;
        const user_id = this.props.review.user_id;
        const review_id = this.props.review.review_id;
        const restaurant_id = this.props.review.restaurant_id;
        const body = { review_id, restaurant_id, user_id, rating, details, updated_at: moment(Date.now()).format('yyyy-MM-DD') };

        // Update review in db
        await this.props.updateReview(review_id, body);

        // Stop submit if any errors from review update
        if (this.props.reviewError) {
            M.toast({ html: this.props.reviewError, classes: "red darken-1" })
            this.setState({ submitLoading: false })
            return this.props.clear(); // Clear reviewError in redux store
        }

        // Run if there are no images to upload
        if (!files) {
            M.toast({ html: 'Review update success!', classes: "light-blue darken-2" })
            this.setState({
                details: this.props.review.details,
                submitLoading: false
            })

            // Refresh review
            await this.props.fetchReview(review_id);
            M.updateTextFields();
        }

        // Run if there are images to upload
        if (files) {
            this.uploadImages(files, review_id, restaurant_id, user_id);
        }
    }

    render() {
        const { details, stars, submitLoading } = this.state;
        const { review } = this.props;
        return (
            <div className="container">
                <div className="mt-2">
                    <div>
                        <p>{stars}</p>
                    </div>
                    <div className="input-field mt-2">
                        <textarea
                            className="materialize-textarea"
                            id="details"
                            value={details}
                            onChange={this.handleChange}
                            disabled={submitLoading}
                            autoFocus
                        >
                        </textarea>
                        <label htmlFor="details">Details</label>
                    </div>
                    <div className="flex mb-sm row">
                        {
                            // Load if the review has images
                            (review && review.images)
                            && review.images.map((image, i) => (
                                <div key={i}>
                                    <div className="mr-sm all-img">
                                        <img src={image[1]} alt="" />
                                    </div>
                                    <div className="mt-sm">
                                        <button className="btn-small red darken-1" onClick={this.deleteImage.bind(this, image)}>Delete</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div>
                        <p>Add photos (optional)</p>
                        <input type="file" onChange={this.handleImage} disabled={submitLoading} multiple />
                    </div>
                    <div className="mt-sm">
                        <button className="btn" disabled={submitLoading} onClick={this.handleSubmit}>
                            {submitLoading ? 'Updating...' : 'Submit'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ review }) => {
    return {
        review: review.review
    }
}

export default connect(mapStateToProps, actions)(EditReview);