import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Preloader from './Preloader';
import { renderStars } from './starsHelper';
import moment from 'moment';
import M from 'materialize-css';

class UserReviews extends Component {
    state = {
        isLoading: true
    }

    async componentDidMount() {
        await this.props.fetchReviewsByUser(this.props.match.params.user_id);
        this.setState({ isLoading: false });
        M.Materialbox.init(document.querySelectorAll('.materialboxed'));
    }

    render() {
        const { isLoading } = this.state;
        const { reviews } = this.props;
        return (
            <div className="container">
                {
                    isLoading
                        ? <div className="center mt-5">
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
                                            </div>
                                        </div>
                                    ))
                                    : <div className="center">No reviews yet</div>
                            }
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = ({ review }) => {
    return {
        reviews: review.reviews
    }
}

export default connect(mapStateToProps, actions)(UserReviews);