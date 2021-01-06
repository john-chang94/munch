import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RestaurantCard from './RestaurantCard';

class Home extends Component {
    state = {
        name: ''
    }

    componentDidMount() {
        this.props.fetchFeatured();
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const { name } = this.state;
        const { featured } = this.props;
        return (
            <div>
                <form className="mt-5">
                    <div className="input-field">
                        <input type="text" placeholder="Search for restaurants..." id="name" value={name} onChange={this.handleChange} />
                        <button className="btn">Search</button>
                    </div>
                </form>

                <div>
                    <h4>Featured</h4>
                </div>

                <div>
                    {
                        featured &&
                        featured.map((restaurant) => (
                            <div key={restaurant.restaurant_id}>
                                <Link to={`/restaurants/${restaurant.restaurant_id}`} className="black-text">
                                    <RestaurantCard
                                        name={restaurant.name}
                                        category={restaurant.category}
                                        rating={restaurant.rating}
                                        total_ratings={restaurant.total_ratings}
                                        price_range={restaurant.price_range}
                                    />
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        featured: state.dash.featured
    }
}

export default connect(mapStateToProps, actions)(Home);