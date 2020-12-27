import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to='/' className="brand-logo center">Munch!</Link>
                <ul className="right mr-2">
                    <li><a href="">Sign In</a></li>
                    <li><a href="">Register</a></li>
                    <li><a href="">Sign Out</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;