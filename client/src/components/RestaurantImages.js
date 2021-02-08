import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import M from 'materialize-css';

class RestaurantImages extends Component {
    async componentDidMount() {
        await this.props.fetchImagesForRestaurant(this.props.match.params.restaurant_id);
        M.Materialbox.init(document.querySelectorAll('.materialboxed'))
    }

    render() {
        const { images } = this.props;
        return (
            <div className="container flex wrap-around justify-se">
                {
                    images && images.map((image, i) => (
                        <div key={i} className="mt-2 all-img z-depth-2">
                            <img className="materialboxed" src={image.url} />
                        </div>
                    ))
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        images: state.review.images
    }
}

export default connect(mapStateToProps, actions)(RestaurantImages);