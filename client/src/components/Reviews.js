import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/reviewActions';

class Reviews extends Component {
    componentDidMount() {
        this.props.fetchReviewsForRestaurant(this.props.restaurant_id);
    }

    render() {
        const { error, reviews } = this.props;
        console.log(reviews)
        return (
            <div>
                {
                    error
                        ? <p>{error}</p>
                        : null
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