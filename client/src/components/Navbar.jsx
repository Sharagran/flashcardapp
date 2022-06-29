import React from 'react'
import { NavLink } from 'react-router-dom'

import '../styles/Navbar.css'

export default function Navbar() {
    return (
        <div id='navbar'>
            <ul>
                <li><NavLink to="/">Dashboard</NavLink></li>
                <li><NavLink to="/create">Create</NavLink></li>
                <li><NavLink to="/learn">Learn</NavLink></li>
                <li><NavLink to="/account">Account</NavLink></li>
            </ul>
        </div>
    )
}
