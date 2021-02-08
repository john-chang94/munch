import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';
import Preloader from './Preloader';
import Filters from './Filters';

const Search = (props) => {
    const [search, setSearch] = useState('');
    const [userSearch, setUserSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cursor, setCursor] = useState(-1);
    const [price, setPrice] = useState('');
    const [propsPrice, setPropsPrice] = useState();

    const handleChange = e => {
        const { value } = e.target;

        if (value) {
            // If user is typing, filter through suggestions with user input value
            let suggestions = props.suggestions.filter(data => {
                return data.param.toLowerCase().startsWith(value.toLowerCase());
            })
            setSearch(value);
            setUserSearch(value); // Temp save user input for setSearchValue
            setSuggestions(suggestions);
        } else {
            // If user is not typing, remove suggestions list
            setSearch('');
            setSuggestions([]);
        }
    }

    const handleKeyDown = e => {
        if (e.key === 'ArrowUp' && cursor > -1) {
            e.preventDefault(); // Prevent insertion point from moving to the beginning
            setCursor(cursor - 1)

        } else if (e.key === 'ArrowDown' && cursor < suggestions.length - 1) {
            setCursor(cursor + 1)

        } else if (e.key === 'Enter') {
            e.preventDefault(); // Prevent duplicate push to history
            let searchValue = document.getElementById('search');

            props.history.push(`/search?find=${searchValue.value}`);

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
        props.history.push(`/search?find=${search}`);

        // Remove suggestions list so onMouseLeave does not trigger after search
        setSuggestions([]);
    }

    const handleClick = suggestion => {
        props.history.push(`/search?find=${suggestion.param}`);

        setSuggestions([]);
    }

    // On component mount
    useEffect(() => {
        const onMount = async () => {
            // URLSearchParams is built-in the browser to work with queries
            const searchQuery = new URLSearchParams(props.history.location.search);
            
            setSearch(searchQuery.get('find'));
            setPrice(searchQuery.get('price'));
            setPropsPrice(searchQuery.get('price'));

            await props.fetchSuggestions();
            await props.search(props.history.location.search);
            setIsLoading(false);
        }
        onMount();

        // Clear state on component unmount
        return () => {
            props.clear();
            setPrice('')
        }
    }, [])

    // On cursor pointer change from arrow keys
    useEffect(() => {
        let item = document.getElementById(cursor);
        let searchValue = document.getElementById('search');

        if (item) searchValue.value = item.textContent
    }, [cursor])

    // On url change, set search input value from query
    useEffect(() => {
        // Clear any error message before search results are fetched
        if (props.dashError) props.clear();
        const searchQuery = new URLSearchParams(props.history.location.search);
        setSearch(searchQuery.get('find'));

        // Separate state for price range as identifier and for props because
        // executing setPrice here will cause the useEffect below to run
        // which will cause this useEffect to run like an endless cycle.
        // Also, an identifier for filters to determine which checkboxes are checked, if any.
        setPropsPrice(searchQuery.get('price'))

        props.search(props.history.location.search);

    }, [props.history.location.search])

    // On price state change, set price range input value from query
    useEffect(() => {
        // Clear any error message when user clicks on a different filter
        if (props.dashError) props.clear();
        const searchQuery = new URLSearchParams(props.history.location.search);

        if (!price) {
            
            // Load all search results if user removes price filter
            searchQuery.delete('price');
            props.history.push(`/search?${searchQuery}`)
        } else {
            if (searchQuery.has('price')) {
                
                searchQuery.set('price', price);
                props.history.push(`/search?${searchQuery}`)
            } else {
                
                searchQuery.append('price', price);
                props.history.push(`/search?${searchQuery}`)
            }
        }

    }, [price])

    return (
        <div className="row">
            <Filters
                price={price}
                propsPrice={propsPrice}
                setPrice={setPrice}
            />
            <div className="col l8 m8 s12">
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="input-field" id="search-area">
                        <input
                            type="text"
                            placeholder="Search for restaurants..."
                            id="search"
                            value={search}
                            onChange={handleChange}
                            autoComplete="off"
                            onKeyDown={handleKeyDown}
                        />
                        <ul>
                            {
                                // Render suggestions, if any
                                suggestions &&
                                suggestions.map((suggestion, i) => (
                                    <li key={i}
                                        id={i}
                                        className={cursor === i ? 'sugg-active' : null}
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
                        isLoading
                            ? <div className="center">
                                <Preloader />
                            </div>
                            : <div>
                                {
                                    // Render error message if no restaurants found with price filter
                                    props.dashError &&
                                    <div className="center">
                                        <p>{props.dashError}</p>
                                    </div>
                                }

                                {
                                    // Only render when restaurants are found without error
                                    (props.results && !props.dashError) &&
                                    props.results.map((restaurant) => (
                                        <div key={restaurant.restaurant_id}>
                                            <Link to={`/restaurants/${restaurant.restaurant_id}`} className="black-text">
                                                <RestaurantCard
                                                    name={restaurant.name}
                                                    category={restaurant.category}
                                                    rating={restaurant.rating}
                                                    total_ratings={restaurant.total_ratings}
                                                    price={restaurant.price}
                                                />
                                            </Link>
                                        </div>
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        results: state.dash.results,
        suggestions: state.dash.suggestions,
        dashError: state.dash.dashError
    }
}

export default connect(mapStateToProps, actions)(Search);