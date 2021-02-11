import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import { renderStars } from './starsHelper'

class Reviews extends Component {
    componentDidMount() {
        this.props.fetchReviewsForRestaurant(this.props.restaurant_id);
    }

    componentWillUnmount() {
        this.props.clearReviews();
    }

    render() {
        const { reviews } = this.props;
        return (
            <div>
                <h5>Reviews</h5>
                {
                    reviews
                        ? reviews.map((review, i) => (
                            <div className="bg-x-light-gray mt-2 pl-2 pr-2 pt-2 pb-2" key={i}>
                                <p>{renderStars(review.rating)}</p>
                                <p>{review.details}</p>
                                <div className="mt-1">
                                    <p className="text-i">{moment(review.date).format('LL')}</p>
                                    <p>Reviewer: {review.first_name} {review.last_name}</p>
                                </div>
                            </div>
                        ))
                        : <div className="center">No reviews yet</div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reviews: state.review.reviews
    }
}

export default connect(mapStateToProps, actions)(Reviews);