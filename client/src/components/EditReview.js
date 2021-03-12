import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { renderStars } from './starsHelper';
import M from 'materialize-css';

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
            details: this.props.review.details
        })
        M.updateTextFields();
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
        const { details, submitLoading } = this.state;
        return (
            <div className="container">
                <form className="mt-2">
                    <div className="input-field">
                        <textarea
                            className="materialize-textarea"
                            id="details"
                            value={details}
                            onChange={this.handleChange}
                            disabled={submitLoading}
                            autoFocus
                            rows='5'
                        >
                        </textarea>
                        <label htmlFor="details">Details</label>
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