import React from 'react';
import './navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>Probe</h2>
            </div>
            <ul className="navbar-links">
                <li><a href="/favorite" className="navbar-link">Favorite</a></li>
                <li><a href="/" className="navbar-link">Logout</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
