import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/dashActions';
import { renderStars } from './starsHelper';

class Restaurant extends Component {
    state = {
        stars: [],
        review: ''
    }

    async componentDidMount() {
        await this.props.fetchRestaurant(this.props.match.params.restaurant_id);
        let stars = renderStars(this.props.restaurant.rating);
        this.setState({ stars })
    }

    render() {
        const { restaurant } = this.props;
        const { stars } = this.state;
        return (
            <div>
                {
                    restaurant &&
                    <div>
                        <p>{restaurant.name}</p>
                        <p>{restaurant.category}</p>
                        <p>{stars} ({restaurant.total_ratings})</p>
                        <p>{'$'.repeat(parseInt(restaurant.price_range))}</p>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        restaurant: state.dash.restaurant
    }
}

export default connect(mapStateToProps, actions)(Restaurant);