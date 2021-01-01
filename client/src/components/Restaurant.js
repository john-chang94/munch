import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/dashActions';
import AddReview from './AddReview';
import { renderStars } from './starsHelper';
import M from 'materialize-css';
import { Link } from 'react-router-dom';

class Restaurant extends Component {
    state = {
        stars: []
    }

    async componentDidMount() {
        await this.props.fetchRestaurant(this.props.match.params.restaurant_id);
        // Render rating with stars
        let stars = renderStars(this.props.restaurant.rating);
        this.setState({ stars })
        
        // Initialize media lightbox
        M.Materialbox.init(document.querySelectorAll('.materialboxed'))
    }

    render() {
        const { restaurant } = this.props;
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
                    <div className="col l4 m6 s10 push-s1 mt-2">
                        <img className="materialboxed w-100" src="https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcurry.jpg?alt=media&token=23f7ab2f-dc17-4583-b2db-f8dd65b04457" alt="" />
                    </div>
                    <div className="col l4 m6 s10 push-s1 mt-2">
                        <img className="materialboxed w-100" src="https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcurry.jpg?alt=media&token=23f7ab2f-dc17-4583-b2db-f8dd65b04457" alt="" />
                    </div>
                    <div className="col l4 m6 s10 push-s1 mt-2">
                        <img className="materialboxed w-100" src="https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fcurry.jpg?alt=media&token=23f7ab2f-dc17-4583-b2db-f8dd65b04457" alt="" />
                    </div>
                </div>

                <div className="center">
                    <Link className="black-text text-expand" to={`/restaurants/${this.props.match.params.restaurant_id}/photos`}>View All Photos</Link>
                </div>
                
                <hr className="mt-4 mb-3" />

                <AddReview />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        restaurant: state.dash.restaurant
    }
}

export default connect(mapStateToProps, actions)(Restaurant);