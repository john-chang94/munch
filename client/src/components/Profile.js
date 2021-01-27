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
        bio: '',
        password: '',
        newPassword: '',
        confirmNewPassword: '',
        file: '',
        url: '',
        showEditGeneral: false,
        showGeneralInfo: true,
        showEditPassword: false,
        showPictureUpload: false
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.user_id);
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    enableEditGeneral = async () => {
        const { user } = this.props;
        await this.setState({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            showEditGeneral: true
        })
        M.updateTextFields();
    }

    disableEditGeneral = () => {
        this.setState({ showEditGeneral: false })
    }

    toggleGeneralInfo = () => {
        this.setState({
            showGeneralInfo: true,
            showEditPassword: false
        })
    }

    toggleEditPassword = () => {
        this.setState({
            showEditPassword: true,
            showGeneralInfo: false,
            showEditGeneral: false
        })
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

    renderGeneralInfo = () => {
        const { user } = this.props;
        return (
            <div>
                <div className="mt-sm">
                <p className="mb-sm teal-text darken-4">General information</p>
                    <label htmlFor="">First Name</label>
                    <p>{user.first_name}</p>
                </div>
                <div className="mt-sm">
                    <label htmlFor="">Last Name</label>
                    <p>{user.last_name}</p>
                </div>
                <div className="mt-sm">
                    <label htmlFor="">Email</label>
                    <p>{user.email}</p>
                </div>
                <div className="mt-1">
                    <button className="btn" onClick={this.enableEditGeneral}>Edit</button>
                </div>
            </div>
        )
    }

    renderEditGeneral = () => {
        const { first_name, last_name, email } = this.state;
        return (
            <div className="mt-3">
                <div className="input-field">
                    <input type="text" id="first_name" value={first_name} onChange={this.handleChange} />
                    <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field">
                    <input type="text" id="last_name" value={last_name} onChange={this.handleChange} />
                    <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="input-field">
                    <input type="text" id="email" value={email} onChange={this.handleChange} />
                    <label htmlFor="email">Email</label>
                </div>
                <button className="btn black-text grey lighten-3" onClick={this.disableEditGeneral}>Cancel</button>
                <button className="btn ml-2">Update</button>
            </div>
        )
    }

    renderEditPassword = () => {
        const { password, newPassword, confirmNewPassword } = this.state;
        return (
            <div className="mt-2">
                <p className="teal-text darken-4">Reset password</p>
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
                <button className="btn">Update</button>
            </div>
        )
    }

    render() {
        const { showEditGeneral, showGeneralInfo, showEditPassword } = this.state;
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
                                <div className="row">
                                    <div className="col s12">
                                        <ul className="tabs z-depth-1">
                                            <li className="tab col s6 pointer bg-hover light-border" onClick={this.toggleGeneralInfo}>General</li>
                                            <li className="tab col s6 pointer bg-hover light-border" onClick={this.toggleEditPassword}>Security</li>
                                        </ul>
                                    </div>
                                </div>
                                {
                                    showGeneralInfo &&
                                    <div>
                                        {
                                            showEditGeneral
                                                ? this.renderEditGeneral()
                                                : this.renderGeneralInfo()
                                        }
                                    </div>
                                }

                                {
                                    showEditPassword &&
                                    <div>
                                        {this.renderEditPassword()}
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