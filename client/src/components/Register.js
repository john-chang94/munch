import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import M from 'materialize-css';

class Register extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await this.props.register(this.state);

        if (this.props.authError) {
            M.toast({ html: this.props.authError, classes: 'red darken-1' })
            this.props.clear();
        }

        if (this.props.success) {
            M.toast({ html: 'Success! You can now sign in.', displayLength: 6000, classes: 'teal darken-1' })
            this.props.history.push('/signin');
        }
    }

    render() {
        const { first_name, last_name, email, password, confirmPassword } = this.state;
        return (
            <div className="mt-5 flex-center">
                <div className="w-50 mb-5">
                    <h4>Create a new account</h4>
                    <form onSubmit={this.handleSubmit}>
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
                        <div className="input-field">
                            <input type="password" id="password" value={password} onChange={this.handleChange} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-field">
                            <input type="password" id="confirmPassword" value={confirmPassword} onChange={this.handleChange} />
                            <label htmlFor="confirmPassword">Confirm Password</label>
                        </div>
                        <div>
                            <button className="btn">Register</button>
                        </div>
                    </form>
                    <div className="mt-1">
                        <p>Already have an account? <Link to='/signin'>Sign in here.</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authError: state.auth.authError,
        success: state.auth.success
    }
}

export default connect(mapStateToProps, actions)(Register);