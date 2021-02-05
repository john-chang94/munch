import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Preloader from './Preloader';
import { renderStars } from './starsHelper';
import moment from 'moment';

class UserReviews extends Component {
    state = {
        isLoading: true
    }

    async componentDidMount() {
        this.props.fetchReviewsByUser(this.props.match.params.userId);
        this.setState({ isLoading: false });
    }

    render() {
        const { isLoading } = this.state;
        const { reviews, reviewError } = this.props;
        return (
            <div className="container">
                {
                    isLoading
                        ? <div>
                            <Preloader />
                        </div>
                        : <div>
                            <h5>My Reviews</h5>
                            {
                                reviews
                                    ? reviews.map((review, i) => (
                                        <div className="bg-x-light-gray mt-2 pl-2 pr-2 pt-2 pb-2" key={i}>
                                            <p><strong>{review.name}</strong></p>
                                            <p>{renderStars(review.rating)}</p>
                                            <p>{review.details}</p>
                                            <div className="mt-1">
                                                <p className="text-i">{moment(review.date).format('LL')}</p>
                                            </div>
                                        </div>
                                    ))
                                    : <div className="center">{reviewError}</div>
                            }
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ review }) => {
    return {
        reviews: review.reviews,
        reviewsError: review.reviewError
    }
}

export default connect(mapStateToProps, actions)(UserReviews);