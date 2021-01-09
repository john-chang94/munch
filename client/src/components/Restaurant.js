import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

import { renderStars } from './starsHelper';
import AddReview from './AddReview';
import Reviews from './Reviews';

class Restaurant extends Component {
    state = {
        stars: []
    }

    async componentDidMount() {
        const restaurant_id = this.props.match.params.restaurant_id;

        this.props.fetchImagesForRestaurant(restaurant_id);
        await this.props.fetchRestaurant(restaurant_id);
        
        // Render rating with stars
        let stars = renderStars(this.props.restaurant.rating);
        this.setState({ stars })
        
        // Initialize media lightbox
        M.Materialbox.init(document.querySelectorAll('.materialboxed'))
    }

    render() {
        const { restaurant, images } = this.props;
        const { stars } = this.state;
        return (
            <div>
                {
                    restaurant &&
                    <div>
                        <p className="heading">{restaurant.name}</p>
                        <p className="cat-heading">{restaurant.category}</p>
                        <p>{stars} ({restaurant.total_ratings})</p>
                        <p>Price range: {'$'.repeat(parseInt(restaurant.price_range))}</p>
                    </div>
                }

                <div className="row mt-1">
                    {
                        images && images.slice(0,4).map((image, i) => (
                            <div className="col l3 m6 s10 push-s1 mt-1" key={i}>
                                <img className="materialboxed w-max" src={image.url} alt=""/>
                            </div>
                        ))
                    }
                </div>

                <div className="center">
                    <Link className="black-text bg-light-gray text-expand" to={`/restaurants/${this.props.match.params.restaurant_id}/photos`}>
                        View All Photos
                    </Link>
                </div>
                
                <hr className="mt-4 mb-3" />

                <AddReview />

                <hr className="mt-3 mb-3" />

                <Reviews restaurant_id={this.props.match.params.restaurant_id} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        restaurant: state.dash.restaurant,
        images: state.review.images
    }
}

export default connect(mapStateToProps, actions)(Restaurant);