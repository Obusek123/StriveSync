import React, { useEffect, useState } from 'react';
import './overview.css';

const DaysSinceLogin = () => {
    const [weekDayFormat, setWeekDayFormat] = useState('');

    // Calculate difference in days from login date
    const calculateDaysSinceLogin = (loginDate) => {
        const login = new Date(loginDate);
        const today = new Date();
        const diffTime = Math.abs(today - login); // Get the difference in milliseconds
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
        return diffDays;
    };

    // Format the difference into weeks and days, starting from Week 1
    const formatToWeekDay = (totalDays) => {
        const weeks = Math.floor(totalDays / 7); // Full weeks
        const days = totalDays % 7; // Remaining days
        return `Week ${weeks + 1} Day ${days + 1}`; // Start from Week 1
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const date = user.signupDate;
        // Fetch signup date from localStorage (use the actual field name in your storage)
        const storedSignupDate = date; // Replace with your logic for fetching from DB/localStorage
        if (storedSignupDate) {
            const days = calculateDaysSinceLogin(storedSignupDate);
            const formatted = formatToWeekDay(days);
            setWeekDayFormat(formatted);
        } else {
            setWeekDayFormat('Signup date not found');
        }
    }, []);

    return (
        <div className='days-since-login'>
            <p>{weekDayFormat}</p>
        </div>
    );
};

export default DaysSinceLogin;
