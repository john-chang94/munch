import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Navbar extends Component {
    handleClick = () => {
        this.props.signOut();
    }

    render() {
        const { user } = this.props;
        return (
            <nav className="nav-wrapper green darken-1">
                <div className="container">
                    <Link to='/' className="brand-logo left">Munch!</Link>
                    <ul className="right">
                        {
                            user
                                ? [
                                    <li key={1} className="mr-1">Hi, {user.first_name}</li>,
                                    <li key={2} onClick={this.handleClick}><Link to='/'>Sign Out</Link></li>
                                ]
                                : [
                                    <li key={1}><Link to='/signin'>Sign In</Link></li>,
                                    <li key={2}><Link to='/register'>Register</Link></li>
                                ]
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, actions)(Navbar);