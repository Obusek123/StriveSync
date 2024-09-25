import React from 'react';
import { NavLink } from 'react-router-dom';
import './dropdown.css';
import '../navbar.css';

const DropDown = () => {
    return (
        <div className='feature-dropdown'>
            <ul>
                <li>
                    {/* Updated for React Router v6 */}
                    <NavLink
                        to='/fitness-calculator'
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Fitness Calculator
                    </NavLink>
                </li>
                <li>
                    {/* Updated for React Router v6 */}
                    <NavLink
                        to='/exercises'
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Workout plan
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default DropDown;

{
    /* <li>
                    
                    <NavLink
                        to='/nutritional-data'
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Nutrition plan
                    </NavLink>
                </li>
                <li>
                    
                    <NavLink
                        to='/goals'
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Goal Tracking
                    </NavLink>
                </li>
                <li>
                  
                    <NavLink
                        to='/Personal-Dashboard'
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Personal Dashboard
                    </NavLink>
                </li> */
}
