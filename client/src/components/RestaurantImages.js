import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import M from 'materialize-css';

class RestaurantImages extends Component {
    componentDidMount() {
        this.props.fetchImagesForRestaurant(this.props.match.params.restaurant_id);
        M.Materialbox.init(document.querySelectorAll('.materialboxed'))
    }

    render() {
        const { images } = this.props;
        return (
            <div className="flex align-center y-start wrap-around">
                {
                    images && images.map((image, i) => (
                        <div key={i} className="mt-2 ml-1 w-23">
                            <img className="materialboxed w-100" src={image.url} />
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
