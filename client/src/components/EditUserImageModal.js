import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Modal from 'react-modal';
import { storage } from '../config/fb';

class EditUserImageModal extends Component {
    state = {
        file: ''
    }

    handleImageUpload = e => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const user_id = this.props.user.user_id;

            const uploadTask = storage.ref(`/images/users/${file.name}`).put(file);
            uploadTask.on('state_changed', console.log, console.error, () => {
                storage
                    .ref('images/users') // Images folder in firebase storage
                    .child(file.name) // Child is the level inside images directory
                    .getDownloadURL() // Fetch image URL from firebase
                    .then(async (url) => {
                        const imageBody = { user_id, url };
                        // Add image url to db
                        await this.props.addUserImage(imageBody);
                        // Fetch updated image to display from props
                        this.props.fetchUserImage(user_id);

                        this.props.closeModal();
                    });
            });
        }
    }

    handleImageDelete = async () => {
        if (window.confirm('Are you sure you want to delete?')) {
            await this.props.deleteUserImage(this.props.user.user_id);
            await this.props.fetchUserImage(this.props.user.user_id);
            this.props.closeModal();
        }
    }

    render() {
        const { modalIsOpen, closeModal, userImage } = this.props;
        const customStyles = {
            content: {
                top: '40%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '450px'
            }
        };

        return (
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <div className="center">
                    <div>
                        <img src={userImage.url} style={{ maxHeight: '350px', maxWidth: '75%' }} alt="" />
                        {
                            !userImage.user_id == 0 &&
                            <p className="red-text darken-1 pointer" onClick={this.handleImageDelete}>Delete profile picture</p>
                        }
                    </div>
                    <div className="mt-1">
                        <p className="mb-sm"><strong>Upload image</strong></p>
                        <input type="file" onChange={this.handleImageUpload} />
                    </div>
                    <div className="mt-1">
                        <button className="btn-small blue-grey lighten-4 black-text" onClick={closeModal}>Close</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default connect(null, actions)(EditUserImageModal);