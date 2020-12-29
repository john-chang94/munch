import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to='/' className="brand-logo center">Munch!</Link>
                <ul className="right mr-2">
                    <li><Link to='/signin'>Sign In</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/'>Sign Out</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;