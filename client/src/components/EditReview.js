import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';
import M from 'materialize-css';

class EditReview extends React.Component {
    state = {
        stars: [],
        rating: '',
        details: '',
        files: '',
        submitLoading: false,
        isHovered: false
    }

    async componentDidMount() {
        await this.props.fetchReview(this.props.match.params.review_id);
        console.log(this.props.match.params.review_id)
        console.log(this.props.review)
        await this.setState({
            details: this.props.review.details
        })
        await this.renderStars(this.props.review.rating);
        M.updateTextFields();
    }

    // Different from renderStars helper because stars
    // have onChange effect to edit the rating if needed
    renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
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

    render() {
        const { details, stars, isHovered, submitLoading } = this.state;
        const { review } = this.props;
        return (
            <div className="container">
                <form className="mt-2">
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
                                        <img src={image} alt="" />
                                    </div>
                                    <div className="mt-sm">
                                        <button className="btn-small red darken-1">Delete</button>
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
                        <button className="btn" disabled={submitLoading}>{submitLoading ? 'Updating...' : 'Submit'}</button>
                    </div>
                </form>
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