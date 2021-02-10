import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import M from 'materialize-css';
import { Link } from 'react-router-dom';

import { renderStars } from './starsHelper';
import AddReview from './AddReview';
import Reviews from './Reviews';
import Preloader from './Preloader';

class Restaurant extends Component {
    state = {
        stars: [],
        isLoading: true
    }

    async componentDidMount() {
        const restaurant_id = this.props.match.params.restaurant_id;

        await this.props.fetchImagesForRestaurant(restaurant_id);
        await this.props.fetchRestaurant(restaurant_id);

        // Render rating with stars
        let stars = renderStars(restaurant_id);
        this.setState({ stars, isLoading: false })

        // Initialize media lightbox
        M.Materialbox.init(document.querySelectorAll('.materialboxed'))
    }

    componentWillUnmount() {
        this.props.clear();
    }

    render() {
        const { restaurant, images, dashError } = this.props;
        const { stars, isLoading } = this.state;
        return (
            <div className="container">
                {
                    isLoading
                        ? <div className="center mt-5">
                            <Preloader />
                        </div>
                        : <div>
                            {   // Display restaurant info once fetched
                                restaurant &&
                                <div className="mb-1">
                                    <p className="heading">{restaurant.name}</p>
                                    <p className="cat-heading">{restaurant.categories.map((category, i) =>
                                        <span key={i}>{category}, </span>
                                    )}</p>
                                    <p>{stars} ({restaurant.total_ratings})</p>
                                    <p>Price range: {'$'.repeat(parseInt(restaurant.price))}</p>
                                </div>
                            }

                            {   // Display message if there are no images for the restaurant
                                dashError
                                    ? <h5 className="center">{dashError}</h5>
                                    : <div>
                                        <div className="flex wrap-around justify-se">
                                            {
                                                images && images.slice(0, 4).map((image, i) => (
                                                    <div className="crop mt-1 mb-sm z-depth-2" key={i}>
                                                        <img className="materialboxed" src={image.url} alt="" />
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <div className="center mt-2">
                                            <Link className="z-depth-1 black-text bg-x-light-gray bg-hover view-all" to={`/restaurants/${this.props.match.params.restaurant_id}/photos`}>
                                                View All Photos
                                            </Link>
                                        </div>
                                    </div>
                            }

                            <hr className="mt-4 mb-3" />

                            <AddReview />

                            <hr className="mt-3 mb-3" />

                            <Reviews restaurant_id={this.props.match.params.restaurant_id} />
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        restaurant: state.dash.restaurant,
        images: state.review.images,
        dashError: state.dash.dashError
    }
}

export default connect(mapStateToProps, actions)(Restaurant);