import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import M from 'materialize-css';

class SignIn extends Component {
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

        if (this.props.success) this.props.history.push('/');
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="mt-5 flex-center">
                <div className="w-50 mb-5">
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

const mapStateToProps = state => {
    return {
        authError: state.auth.authError,
        reviewError: state.review.reviewError,
        success: state.auth.success
    }
}

export default connect(mapStateToProps, actions)(SignIn);