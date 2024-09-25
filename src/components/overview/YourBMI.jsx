import React, { useEffect, useState } from 'react';

const YourBMI = () => {
    const [user, setUser] = useState({}); // Initialize as an empty object

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            try {
                const parsedData = JSON.parse(userData);
                setUser(parsedData);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    return (
        <div className='your'>
            <div>{user.personalInfo ? user.personalInfo.bmi : 'N/A'}</div>
            <span>BMI</span>
        </div>
    );
};

export default YourBMI;
