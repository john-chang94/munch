import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import M from 'materialize-css';

const SignInModal = ({ modalIsOpen, closeModal }) => {

    const [formValues, setFormValues] = useState({
        email: '',
        password: ''
    })

    const handleChange = e => {
        // Use spread to prevent changing undefined value to defined (React error)
        setFormValues({ ...formValues, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues)
        await this.props.signIn(formValues);
        
        if (this.props.authError) {
            M.toast({ html: this.props.authError, classes: "red darken-1" })
            this.props.clear(); // Clear authError in redux store
        }

        // if (this.props.success) this.props.history.push('/');
    }

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
                <h4>Sign In</h4>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <input type="email" id="email" value={formValues.email} onChange={handleChange} />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        <input type="password" id="password" value={formValues.password} onChange={handleChange} />
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

const mapStateToProps = state => {
    return {
        authError: state.auth.authError
    }
}

export default connect(mapStateToProps, actions)(SignInModal);