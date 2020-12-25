import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/dashActions';
import RestaurantCard from './RestaurantCard';

class Home extends Component {
    state = {
        name: ''
    }

    componentDidMount() {
        this.props.fetchRecommended();
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { name } = this.state;
        const { recommended } = this.props;
        return (
            <div>
                <form>
                    <div className="input-field">
                        <input type="text" placeholder="Search for restaurants..." name="name" value={name} onChange={this.handleChange} />
                        <button>Search</button>
                    </div>
                </form>

                <div>
                    <h4>Recommended</h4>
                </div>

                <div>
                    {
                        recommended ?
                            recommended.map((restaurant, i) => (
                                <RestaurantCard key={i}
                                    name={restaurant.name}
                                    category={restaurant.category}
                                    rating={restaurant.rating}
                                    total_ratings={restaurant.total_ratings}
                                    price_range={restaurant.price_range}
                                />
                            ))
                        : null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        recommended: state.dash.recommended
    }
}

export default connect(mapStateToProps, actions)(Home);