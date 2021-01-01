import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/dashActions';
import { storage } from '../config/fb';

class AddReview extends Component {
    state = {
        rating: '',
        details: '',
        file: '',
        url: '',
        stars: []
    }

    componentDidMount() {
        // Initial render emtpy stars for leaving a review
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <i className="far fa-star yellow-text text-darken-2"
                    key={i}
                    onClick={() => this.handleRating(i)}>
                </i>
            )
        }
        this.setState({ stars })
    }

    handleRating = (starIndex) => {
        // Materialize classes for filled and empty stars
        const filled = 'fas fa-star yellow-text text-darken-2';
        const empty = 'far fa-star yellow-text text-darken-2';
        let stars = [];

        for (let i = 0; i < 5; i++) {
            // If the selected star index is >= current loop index,
            // add a filled star, otherwise add an empty star
            stars.push(<i className={starIndex >= i ? filled : empty} key={i} onClick={() => this.handleRating(i)}></i>)
        }
        this.setState({
            rating: starIndex + 1, // Rating must be from 1 to 5
            stars
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleImage = e => {
        this.setState({
            file: e.target.files[0]
        })
    }

    handleUpload = e => {
        const { file } = this.state;
        e.preventDefault();
        // images folder in firebase storage
        const uploadTask = storage.ref(`/images/${file.name}`).put(file);
        uploadTask.on('state_changed', console.log, console.error, () => {
            storage
                .ref('images') // images folder in firebase storage
                .child(file.name) // child is the level inside images directory
                .getDownloadURL()
                .then((url) => {
                    this.setState({
                        file: null,
                        url
                    })
                });
        });
    }

    handleSubmit = () => {
        const { rating, details, url } = this.state;
        const { user_id } = this.props.user;
        const { restaurant_id } = this.props.match.params;
        // create three separate functions
    }

    render() {
        const { details, file, url, stars } = this.state;
        return (
            <div>
                <p>Leave a review</p>
                <div>
                    <p>{stars}</p>
                </div>
                <div>
                    <form onSubmit={this.handleUpload}>
                        <div className="input-field">
                            <textarea className="materialize-textarea" id="details" value={details} onChange={this.handleChange}></textarea>
                            <label htmlFor="details">Details</label>
                        </div>
                        <div>
                            <p>Add a photo</p>
                            <input type="file" onChange={this.handleImage} />
                            <button disabled={!file}>Upload to firebase</button>
                        </div>
                    </form>
                    <img src={url} className="w-100" alt="" />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, actions)(AddReview);