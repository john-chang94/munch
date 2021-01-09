import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RestaurantCard from './RestaurantCard';

class Home extends Component {
    state = {
        search: '',
        query: '',
        items: []
    }

    componentDidMount() {
        this.props.fetchFeatured();
        this.props.fetchSuggestions();
    }

    handleChange = e => {
        const { id, value } = e.target;

        if (value) {
            let items = this.props.suggestions.filter(data => {
                return data.phrase.toLowerCase().startsWith(value.toLowerCase());
            })
            console.log(items)
            this.setState({
                [id]: value,
                items
            })
        } else {
            this.setState({
                search: '',
                items: []
            })
        }

    }

    handleSearch = e => {
        e.preventDefault();
        const { search, query } = this.state;

        if (search) {
            this.props.history.push(`/search?${query}=${search}`);
        } else {
            this.props.history.push('/');
        }

        this.props.searchRestaurant(this.props.history.location.search);
    }

    render() {
        const { search, items } = this.state;
        const { featured } = this.props;
        console.log(this.props.history.location)
        return (
            <div>
                <form className="mt-5" onSubmit={this.handleSearch}>
                    <div className="input-field" id="search-area">
                        <input type="text" placeholder="Search for restaurants..." id="search" value={search} onChange={this.handleChange} />
                        <ul>
                            {
                                items && items.map((item, i) => (
                                    <li key={i}>{item.phrase}</li>
                                ))
                            }
                        </ul>
                        <button className="btn mt-sm">Search</button>
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
        featured: state.dash.featured,
        suggestions: state.dash.suggestions
    }
}

export default connect(mapStateToProps, actions)(Home);