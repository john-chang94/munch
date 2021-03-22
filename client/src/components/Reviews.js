import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import moment from 'moment';
import M from 'materialize-css';
import { renderStars } from './starsHelper';

class Reviews extends Component {
    async componentDidMount() {
        await this.props.fetchReviewsForRestaurant(this.props.restaurant_id);
        M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    }

    render() {
        const { reviews } = this.props;
        return (
            <div>
                <h5>Reviews</h5>
                {
                    reviews
                        ? reviews.map((review, i) => (
                            <div className="bg-x-light-gray mt-2 p-all-2" key={i}>
                                <p>{renderStars(review.rating)}</p>
                                <p>{review.details}</p>
                                <div className="flex mt-sm">
                                    {
                                        review.images &&
                                        review.images.map((image, i) => (
                                            <div className="review-crop mr-sm" key={i}>
                                                <img src={image} alt="" className="materialboxed" />
                                            </div>
                                        ))
                                    }
                                </div>
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