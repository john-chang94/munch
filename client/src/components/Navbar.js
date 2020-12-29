import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {
    render() {
        const { user } = this.props;
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to='/' className="brand-logo center">Munch!</Link>
                    <ul className="right mr-2">
                        {
                            user
                                ? [
                                    <li>Hi, {user.first_name}</li>,
                                    <li><Link to='/'>Sign Out</Link></li>
                                ]
                                : [
                                    <li><Link to='/signin'>Sign In</Link></li>,
                                    <li><Link to='/register'>Register</Link></li>
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
        user: state.user.user
    }
}

export default connect(mapStateToProps)(Navbar);