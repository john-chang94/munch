import React, { Component } from 'react';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="full flex-center">
                <div className="full">
                    <h4>Sign In</h4>
                    <form>
                        <div className="input-field">
                            <input type="email" name="email" value={email} onChange={this.handleChange} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input type="password" name="password" value={password} onChange={this.handleChange} />
                            <label htmlFor="password">Password</label>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignIn;