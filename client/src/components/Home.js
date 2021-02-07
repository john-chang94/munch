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
        suggestions: [],
        isLoading: true,
        cursor: -1
    }

    async componentDidMount() {
        await this.props.fetchFeatured();
        await this.props.fetchSuggestions();

        this.setState({ isLoading: false })
    }

    // Update search input value of selected item from suggestions using arrow keys
    componentDidUpdate() {
        let item = document.getElementById(this.state.cursor);
        let search = document.getElementById('search');

        if (item) search.value = item.textContent;
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
                suggestions: [],
                cursor: -1
            })
        }
    }

    handleKeyDown = e => {
        const { cursor, suggestions } = this.state;
        if (e.key === 'ArrowUp' && cursor > -1) {
            e.preventDefault(); // Prevent insertion point from moving to the beginning
            this.setState({ cursor: cursor - 1 })

        } else if (e.key === 'ArrowDown' && cursor < suggestions.length - 1) {
            this.setState({ cursor: cursor + 1 })

        } else if (e.key === 'Enter') {
            e.preventDefault();
            let searchValue = document.getElementById('search');

            this.props.history.push(`/search?find=${searchValue.value}`);
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        const { search } = this.state;

        this.props.history.push(`/search?find=${search}`);
    }

    setSearchValue = (isHovered, suggestion, index) => {
        const { userSearch } = this.state;

        // Set value of suggestion in search box when isHovered is true
        if (isHovered) this.setState({
            search: suggestion.param,
            cursor: index
        })
        // Set original value in search box that the user was typing when isHovered is false
        else this.setState({
            search: userSearch,
            cursor: -1
        })
    }

    handleClick = suggestion => {
        this.props.history.push(`/search?find=${suggestion.param}`);
    }

    render() {
        const { search, suggestions, isLoading, cursor } = this.state;
        const { featured } = this.props;
        return (
            <div className="container">
                <form className="mt-5" onSubmit={this.handleSubmit}>
                    <div className="input-field" id="search-area">
                        <input
                            type="text"
                            placeholder="Search for restaurants..."
                            id="search"
                            value={search}
                            onChange={this.handleChange}
                            autoComplete="off"
                            onKeyDown={this.handleKeyDown}
                        />
                        <ul>
                            {
                                // Render suggestions, if any
                                suggestions &&
                                suggestions.map((suggestion, i) => (
                                    <li key={i}
                                        id={i}
                                        className={cursor === i ? 'sugg-active' : null}
                                        onClick={this.handleClick.bind(this, suggestion)}
                                        onMouseEnter={this.setSearchValue.bind(this, true, suggestion, i)}
                                        onMouseLeave={this.setSearchValue.bind(this, false, suggestion, i)}
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

                {/* <div>
                    {
                        isLoading
                            ? <div className="center">
                                <Preloader />
                            </div>
                            : featured.map((restaurant) => (
                                <div key={restaurant.restaurantId}>
                                    <Link to={`/restaurants/${restaurant.restaurantId}`} className="black-text">
                                        <RestaurantCard
                                            name={restaurant.name}
                                            category={restaurant.category}
                                            rating={restaurant.rating}
                                            totalRatings={restaurant.totalRatings}
                                            price={restaurant.price}
                                        />
                                    </Link>
                                </div>
                            ))
                    }
                </div> */}
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