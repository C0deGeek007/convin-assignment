import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './Header.css';

export function Header() {
    return (
       <div>
            <header>
        <div className='header-container'>
            <nav>
                <ul>
                    <li>Convin</li>
                    <div className='navigation-container'>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/history">History</Link></li>
                    </div>
                </ul>
            </nav>
        </div>
       </header>
       </div>
    );
}

export default Header;