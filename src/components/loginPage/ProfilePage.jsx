import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Calendar from '../../syncfusion/Calendar';
import SparkLine from '../../syncfusion/SparkLine';
import './login.css';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');

        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('user'); // Remove user data from localStorage
        setUserData(null); // Clear user data state
        navigate('/login'); // Navigate back to the login page
        window.location.reload();
    };

    const handleProfileEdit = () => {
        navigate('/profile-edit');
        window.location.reload();
    };

    return (
        <div className='profile-page'>
            <div className='profile-section'>
                <div className='container'>
                    {userData ? (
                        <div className='profile-show'>
                            <div className='alpha'>
                                <span className='circle'>
                                    {userData.username
                                        .split(' ')[0]
                                        .charAt(0)
                                        .toUpperCase()}
                                    {userData.username.split(' ')[1] &&
                                        userData.username
                                            .split(' ')[1]
                                            .charAt(0)
                                            .toUpperCase()}
                                </span>

                                <span className='username'>
                                    {userData.username}
                                </span>
                            </div>

                            <div
                                className='edit-profile'
                                onClick={handleProfileEdit}
                            >
                                <span>Profile</span>
                                <i className='ri-edit-2-fill'></i>
                            </div>
                        </div>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
            </div>
            <div className='container'>
                <Calendar />
                <SparkLine />
            </div>
            <div className='button-logout' onClick={handleLogout}>
                <div className='container button-contaier'>
                    <i className='ri-logout-box-r-line'></i>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
