import React from 'react';
// import Calendar from '../../syncfusion/Calendar';
import SparkLine from '../../syncfusion/SparkLine';
import Weather from '../overview/Weather';
import YourBMI from '../overview/YourBMI';
import DaysSinceLogin from '../overview/DaysSinceLogin';
import PassedTask from './PassedTask';
import FoodSearch from './FoodSearch';

const Overview = () => {
    return (
        <div className='overview'>
            <p className='welcome'>Welcome back 👋</p>
            <div className='days-since'>
                <DaysSinceLogin />
            </div>
            <div className='weather'>
                <div className='wea'>
                    <Weather />
                </div>
                <div className='tasks'>
                    <PassedTask />
                </div>
                <div className='search'>
                    <FoodSearch />
                </div>
            </div>
            <div className='your-bmi'>
                <YourBMI />
            </div>

            <div className='data-show'>
                <div className='sparkline'>
                    <SparkLine />
                </div>
                {/* <div className='calendar'>
                    <Calendar />
                </div> */}
            </div>
        </div>
    );
};

export default Overview;
