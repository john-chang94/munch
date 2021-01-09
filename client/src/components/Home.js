import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RestaurantCard from './RestaurantCard';

class Home extends Component {
    state = {
        search: '',
        searchHold: '',
        query: '',
        suggestions: []
    }

    componentDidMount() {
        this.props.fetchFeatured();
        this.props.fetchSuggestions();
    }

    handleChange = e => {
        const { id, value } = e.target;

        if (value) {
            let suggestions = this.props.suggestions.filter(data => {
                return data.param.toLowerCase().startsWith(value.toLowerCase());
            })
            console.log(suggestions)

            this.setState({
                [id]: value,
                searchHold: value,
                suggestions
            })
        } else {
            this.setState({
                search: '',
                suggestions: []
            })
        }

    }

    // handleSearch = e => {
    //     e.preventDefault();
    //     const { search, query } = this.state;

    //     if (search) {
    //         this.props.history.push(`/search?${query}=${search}`);
    //     } else {
    //         this.props.history.push('/');
    //     }

    //     this.props.searchRestaurant(this.props.history.location.search);
    // }

    setSearchValue = (hovered, suggestion) => {
        const {searchHold } = this.state;

        // Set value of suggestion in search box when mouse is hovered over selection
        if (hovered) this.setState({ search: suggestion.param })
        // Set original value in search box that the user was typing when mouse leaves
        else this.setState({ search: searchHold })
    }

    handleClick = (suggestion) => {
        this.props.history.push(`/search?${suggestion.query}=${suggestion.param}`);
        this.props.searchRestaurant(this.props.history.location.search);;
    }

    render() {
        const { search, suggestions } = this.state;
        const { featured } = this.props;
        return (
            <div>
                <form className="mt-5" onSubmit={this.handleSearch}>
                    <div className="input-field" id="search-area">
                        <input
                            type="text"
                            placeholder="Search for restaurants..."
                            id="search"
                            value={search}
                            onChange={this.handleChange}
                            autoComplete="off"
                        />
                        <ul>
                            {
                                suggestions && suggestions.map((suggestion, i) => (
                                    <li key={i}
                                        onClick={this.handleClick.bind(this, suggestion)}
                                        onMouseEnter={this.setSearchValue.bind(this, true, suggestion)}
                                        onMouseLeave={this.setSearchValue.bind(this, false, suggestion)}
                                    >{suggestion.param}</li>
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