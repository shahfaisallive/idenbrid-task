import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const linkStyle = {
        color: '#333',
        textDecoration: 'none',
        backgroundColor: '#E7DCDA',
        margin: '10px',
        padding: '0 20px 0 20px'
    };

    return (
        <nav style={{borderBottom: '2px solid black', marginBottom: '50px', paddingBottom: '5px'}}>
            <NavLink exact to="/" style={linkStyle} activeStyle={{ fontWeight: 'bold' }}>
                Home
            </NavLink>
            <NavLink to="/admin" style={linkStyle} activeStyle={{ fontWeight: 'bold' }}>
                Admin
            </NavLink>
        </nav>
    );
};

export default Navbar;
