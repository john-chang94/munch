import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

class SignInModal extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.props.signIn(this.state);
        
        if (this.props.authError) {
            M.toast({ html: this.props.authError, classes: "red darken-1" })
            this.props.clear(); // Clear authError in redux store
        }

        if (this.props.success) {
            await this.props.checkUserHasReview(this.props.reviews, this.props.user);
            this.props.closeModal();
        }
    }

    render() {
        const { email, password } = this.state;
        const { modalIsOpen, closeModal } = this.props;
        const customStyles = {
            content: {
                top: '40%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '500px'
            }
        };

        return (
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                onRequestClose={closeModal}
                ariaHideApp={false}
            >
                <div>
                    <h5>Sign In</h5>
                    <form onSubmit={this.handleSubmit} className="mt-1">
                        <div className="input-field">
                            <input type="email" id="email" value={email} onChange={this.handleChange} autoFocus />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input type="password" id="password" value={password} onChange={this.handleChange} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div>
                            <button className="btn">Sign In</button>
                        </div>
                    </form>
                    <div className="mt-1">
                        <p>Don't have an account? <Link to='/register'>Sign up here.</Link></p>
                    </div>
                </div>
            </Modal>
        )
    }
    
}

const mapStateToProps = ({ auth, review }) => {
    return {
        authError: auth.authError,
        success: auth.success,
        reviews: review.reviews,
        user: auth.user
    }
}

export default connect(mapStateToProps, actions)(SignInModal);