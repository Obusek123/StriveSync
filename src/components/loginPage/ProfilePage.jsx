import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

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

    return (
        <div className='container'>
            <h1>Profile Page</h1>
            {userData ? (
                <div>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    {/* Logout button */}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default ProfilePage;
