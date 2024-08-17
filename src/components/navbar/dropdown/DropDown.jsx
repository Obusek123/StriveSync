import React from 'react';
import { NavLink } from 'react-router-dom';
import './dropdown.css';
import '../navbar.css';

const DropDown = () => {
    return (
        <div className='feature-dropdown'>
            <ul>
                <li>
                    <NavLink to='/fitness-calculator' activeClassName='active'>
                        Fitness Calculator
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/exercises' activeClassName='active'>
                        Workout plan
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/nutritional-data' activeClassName='active'>
                        Nutrition plan
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/goals' activeClassName='active'>
                        Goal Tracking
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/your-dashboard' activeClassName='active'>
                        Personal Dashboard
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default DropDown;
