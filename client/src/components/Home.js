import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import RestaurantCard from './RestaurantCard';
import Preloader from './Preloader';

class Home extends Component {
    state = {
        search: '',
        userSearch: '',
        query: '',
        suggestions: [],
        isLoading: true
    }

    async componentDidMount() {
        await this.props.fetchFeatured();
        await this.props.fetchSuggestions();

        this.setState({ isLoading: false })
    }

    handleChange = e => {
        const { id, value } = e.target;

        if (value) {
            // If user is typing, filter through suggestions with user input value
            let suggestions = this.props.suggestions.filter(data => {
                return data.param.toLowerCase().startsWith(value.toLowerCase());
            })
            this.setState({
                [id]: value,
                userSearch: value, // Temp save user input for setSearchValue
                suggestions
            })
        } else {
            // If user is not typing, remove suggestions list
            this.setState({
                search: '',
                suggestions: []
            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { search } = this.state;

        this.props.history.push(`/search?find=${search}`);
        this.props.search(this.props.history.location.search);
    }

    setSearchValue = (isHovered, suggestion) => {
        const { userSearch } = this.state;

        // Set value of suggestion in search box when isHovered is true
        if (isHovered) this.setState({ search: suggestion.param })
        // Set original value in search box that the user was typing when isHovered is false
        else this.setState({ search: userSearch })
    }

    handleClick = suggestion => {
        this.props.history.push(`/search?find=${suggestion.param}`);
        this.props.search(this.props.history.location.search);
    }

    render() {
        const { search, suggestions, isLoading } = this.state;
        const { featured } = this.props;
        return (
            <div className="full">
                <form className="mt-5" onSubmit={this.handleSubmit}>
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
                                // Render suggestions, if any
                                suggestions &&
                                suggestions.map((suggestion, i) => (
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
                        isLoading
                            ? <div className="center">
                                <Preloader />
                            </div>
                            : featured.map((restaurant) => (
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