import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/dashActions';

class AddReview extends Component {
    state = {
        rating: '',
        details: '',
        file: '',
        url: ''
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

    render() {
        return (
            <div>
                <p>FIREBASE UPLOAD TEST</p>
                <div>
                    <form onSubmit={this.handleUpload}>
                        <input type="file" onChange={this.handleImage} />
                        <button disabled={!this.state.file}>Upload to firebase</button>
                    </form>
                    <img src={this.state.url} alt="" />
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(AddReview);