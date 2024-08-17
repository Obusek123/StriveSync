import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import DropDown from './dropdown/DropDown';

const NavBar = () => {
    return (
        <div className='site-header'>
            <div className='container'>
                <div className='header'>
                    <div className='logo'>
                        <img
                            src='src/assets/images/strivesync_logo.png'
                            alt='Logo.png'
                        />
                    </div>
                    <div className='nav'>
                        <ul>
                            <li className='nav-item'>
                                {' '}
                                {/* Added class for positioning */}
                                <NavLink exact to='/' activeClassName='active'>
                                    Home
                                </NavLink>
                            </li>
                            <li className='nav-item dropdown'>
                                {' '}
                                {/* Added dropdown class for styling */}
                                <NavLink
                                    to='/features'
                                    activeClassName='active'
                                >
                                    Features
                                </NavLink>
                                <DropDown /> {/* Dropdown component */}
                            </li>
                            <li className='nav-item'>
                                <NavLink
                                    to='/services'
                                    activeClassName='active'
                                >
                                    Services
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/blogs' activeClassName='active'>
                                    Blogs
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/about' activeClassName='active'>
                                    About us
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='login'>
                        <img
                            src='src/assets/icons/bell_icon.png'
                            alt='bell-icon'
                        />
                        <span>
                            <NavLink to='/login' activeClassName='active'>
                                Login
                            </NavLink>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
