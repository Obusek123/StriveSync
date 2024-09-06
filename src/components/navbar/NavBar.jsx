import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import DropDown from './dropdown/DropDown';

const NavBar = () => {
    const [user, setUser] = useState(null);

    // Use useEffect to fetch user data from localStorage when component mounts
    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            const parsedUser = JSON.parse(storedUserData);
            setUser(parsedUser); // Assuming parsedUser contains the user object with a username
        }
    }, []);
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
                                {/* Updated for React Router v6 */}
                                <NavLink
                                    to='/'
                                    className={({ isActive }) =>
                                        isActive ? 'active' : ''
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className='nav-item dropdown'>
                                {/* Updated for React Router v6 */}
                                <NavLink
                                    to='/features'
                                    className={({ isActive }) =>
                                        isActive ? 'active' : ''
                                    }
                                >
                                    Features
                                </NavLink>
                                <DropDown /> {/* Dropdown component */}
                            </li>
                            <li className='nav-item'>
                                {/* Updated for React Router v6 */}
                                <NavLink
                                    to='/services'
                                    className={({ isActive }) =>
                                        isActive ? 'active' : ''
                                    }
                                >
                                    Services
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                {/* Updated for React Router v6 */}
                                <NavLink
                                    to='/blogs'
                                    className={({ isActive }) =>
                                        isActive ? 'active' : ''
                                    }
                                >
                                    Blogs
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                {/* Updated for React Router v6 */}
                                <NavLink
                                    to='/about'
                                    className={({ isActive }) =>
                                        isActive ? 'active' : ''
                                    }
                                >
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
                        <div className='logged'>
                            {user ? (
                                <NavLink
                                    to='/profile'
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'active logged-user'
                                            : 'logged-user'
                                    }
                                >
                                    {user.username.charAt(0).toUpperCase()}
                                </NavLink>
                            ) : (
                                <NavLink
                                    to='/login'
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'active no-logged'
                                            : 'no-logged'
                                    }
                                >
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
