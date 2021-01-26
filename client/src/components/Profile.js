import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { storage } from '../config/fb';
import M from 'materialize-css';

class Profile extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        newPassword: '',
        confirmNewPassword: '',
        file: '',
        url: '',
        showEditPassword: false,
        showPictureUpload: false
    }

    async componentDidMount() {
        await this.props.fetchUser(this.props.match.params.user_id);
        M.updateTextFields();
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    toggleEditPassword = () => {
        this.setState({ showEditPassword: !this.state.showEditPassword })
    }

    handleImageUpload = () => {
        const { file } = this.state;
        const uploadTask = storage.ref(`/images/users/${file.name}`).put(file);
        uploadTask.on('state_changed', console.log, console.error, () => {
            storage
                .ref('images/users') // Images folder in firebase storage
                .child(file.name) // Child is the level inside images directory
                .getDownloadURL() // Fetch image URL from firebase
                .then(async (url) => {
                    const imageBody = {
                        // user_id,
                        // url
                    }
                    // Add image url to db with required foreign keys
                    // await this.props.addUserImage(imageBody);

                    // Show success message and clear form
                    M.toast({ html: 'Review submit success!', classes: "light-blue darken-2" });
                    this.setState({ showPictureUpload: false })

                });
        });
    }

    render() {
        const { first_name, last_name, email, password, newPassword, confirmNewPassword, showEditPassword } = this.state;
        const { user } = this.props;
        return (
            <div className="container">
                <div className="row">
                    {
                        user &&
                        <div>
                            <div className="col l3 m3 s12 mt-3">
                                <div className="center mb-1">
                                    <img src="https://firebasestorage.googleapis.com/v0/b/munch-41699.appspot.com/o/images%2Fusers%2Fperson-blank.png?alt=media&token=4aee30b3-f925-45cf-bfe5-decedd6fc5b8" className="w-50" alt="" />
                                </div>
                                <div className="center">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur itaque et maiores, illum corporis nisi laborum, sed autem, odio voluptate a? Eos amet cum laboriosam facere sequi delectus dolorem dignissimos.</p>
                                </div>
                            </div>
                            <div className="col l9 m9 s12 mt-2">
                                {
                                    !showEditPassword
                                        ? <div>
                                            <div className="input-field">
                                                <input type="text" id="first_name" defaultValue={user.first_name} onChange={this.handleChange} />
                                                <label htmlFor="first_name">First Name</label>
                                            </div>
                                            <div className="input-field">
                                                <input type="text" id="last_name" defaultValue={user.last_name} onChange={this.handleChange} />
                                                <label htmlFor="last_name">Last Name</label>
                                            </div>
                                            <div className="input-field">
                                                <input type="text" id="email" defaultValue={user.email} onChange={this.handleChange} />
                                                <label htmlFor="email">Email</label>
                                            </div>
                                            <button className="btn" onClick={this.toggleEditPassword}>Reset password</button>
                                        </div>
                                        : <div>
                                            <div className="input-field">
                                                <input type="password" id="password" value={password} onChange={this.handleChange} />
                                                <label htmlFor="password">Current Password</label>
                                            </div>
                                            <div className="input-field">
                                                <input type="password" id="newPassword" value={newPassword} onChange={this.handleChange} />
                                                <label htmlFor="newPassword">New Password</label>
                                            </div>
                                            <div className="input-field">
                                                <input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={this.handleChange} />
                                                <label htmlFor="confirmNewPassword">Confirm New Password</label>
                                            </div>
                                            <button className="btn black-text grey lighten-3" onClick={this.toggleEditPassword}>Cancel</button>
                                            <button className="btn ml-2">Update</button>
                                        </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user: user.user
    }
}

export default connect(mapStateToProps, actions)(Profile);