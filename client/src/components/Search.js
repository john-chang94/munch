import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';

const Search = (props) => {
    const [search, setSearch] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = e => {
        const { value } = e.target;

        if (value) {
            // If user is typing, filter through suggestions with user input value
            let suggestions = props.suggestions.filter(data => {
                return data.param.toLowerCase().startsWith(value.toLowerCase());
            })
            setSearch(value);
            setUserSearch(value);
            setSuggestions(suggestions);
        } else {
            // If user is not typing, remove suggestions list
            setSearch('');
            setSuggestions([]);
        }
    }

    const setSearchValue = (isHovered, suggestion) => {
        // Set value of suggestion in search box when isHovered is true
        if (isHovered) setSearch(suggestion.param);
        // Set original value in search box that the user was typing when isHovered is false
        else setSearch(userSearch);
    }

    const handleSubmit = e => {
        e.preventDefault();
        // Set search in LS for use in Search component on page refresh
        localStorage.setItem('search', search);

        props.history.push(`/search?find=${search}`);
        props.search(props.history.location.search);

        // Remove suggestions list so onMouseLeave does not trigger after search
        setSuggestions([]);
    }

    const handleClick = suggestion => {
        localStorage.setItem('search', search);

        props.history.push(`/search?find=${suggestion.param}`);
        props.search(props.history.location.search);
        
        setSuggestions([]);
    }

    useEffect(() => {
        const search = localStorage.getItem('search');

        props.fetchSuggestions();
        props.search(props.history.location.search);
        setSearch(search);
    }, [])

    useEffect(() => {
        // FIX PREV SEARCH VALUE
        const find = props.history.location.search.split('find=')
        console.log(find)
        props.search(props.history.location.search);
        setSearch(find[1]);
    }, [props.history.location.search])

    return (
        <div className="full">
            <form className="mt-5" onSubmit={handleSubmit}>
                <div className="input-field" id="search-area">
                    <input
                        type="text"
                        placeholder="Search for restaurants..."
                        id="search"
                        value={search}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <ul>
                        {
                            // Render suggestions, if any
                            suggestions &&
                            suggestions.map((suggestion, i) => (
                                <li key={i}
                                    onClick={handleClick.bind(this, suggestion)}
                                    onMouseEnter={setSearchValue.bind(this, true, suggestion)}
                                    onMouseLeave={setSearchValue.bind(this, false, suggestion)}
                                >{suggestion.param}</li>
                            ))
                        }
                    </ul>
                    <button className="btn mt-sm">Search</button>
                </div>
            </form>

            <div>
                <h4>Results</h4>
            </div>

            <div>
                {
                    props.results &&
                    props.results.map((restaurant) => (
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

const mapStateToProps = state => {
    return {
        results: state.dash.results,
        suggestions: state.dash.suggestions
    }
}

export default connect(mapStateToProps, actions)(Search);