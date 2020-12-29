import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions/authActions';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="full flex-center">
                <div className="w-50">
                    <h4>Sign In</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <input type="email" id="email" value={email} onChange={this.handleChange} />
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
            </div>
        )
    }
}

export default connect(null, actions)(SignIn);