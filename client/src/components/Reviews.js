import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';

class Reviews extends Component {
    componentDidMount() {
        this.props.fetchReviewsForRestaurant(this.props.restaurant_id);
    }

    renderRatingStars = rating => {
        // Font Awesome & Materialize classes for filled and empty stars
        const filled = 'fas fa-star yellow-text text-darken-2 pointer';
        const empty = 'far fa-star yellow-text text-darken-2 pointer';
        let stars = [];

        for (let i = 0; i < 5; i++) {
            // If the selected star index is >= current loop index,
            // add a filled star, otherwise add an empty star
            stars.push(
                <i className={rating >= i
                    ? filled
                    : empty}
                    key={i}>
                </i>
            )
        }

        return stars;
    }

    render() {
        const { error, reviews } = this.props;
        return (
            <div>
                <h5>Reviews</h5>
                {
                    reviews
                        ? reviews.map((review, i) => (
                            <div className="bg-x-light-gray mt-2 pl-2 pr-2 pt-2 pb-2" key={i}>
                                <p>{this.renderRatingStars(review.rating)}</p>
                                <p>{review.details}</p>
                                <div className="mt-1">
                                    <p className="text-i">{moment(review.date).format('LL')}</p>
                                    <p>Reviewer: {review.first_name} {review.last_name}</p>
                                </div>
                            </div>
                        ))
                        : <div className="center">{error}</div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.review.reviews,
        error: state.review.error
    }
}

export default connect(mapStateToProps, actions)(Reviews);