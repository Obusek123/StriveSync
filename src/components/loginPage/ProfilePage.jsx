import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Overview from '../overview/Overview';
import './login.css';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');

        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            setUserData(parsedData);
            setProfileImage(parsedData.profileImage || null); // Load image from localStorage
        }
    }, []);

    // Function to handle image upload
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = reader.result; // Convert image to base64
                setProfileImage(base64Image);

                // Update local storage
                const updatedUser = { ...userData, profileImage: base64Image };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUserData(updatedUser);

                // Send the image to the backend to store in the database
                uploadImageToServer(base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    // Function to handle sending the image to the backend
    const uploadImageToServer = async (image) => {
        const userId = userData?._id;
        try {
            await fetch(
                `http://localhost:8080/api/user/${userId}/uploadImage`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ profileImage: image }),
                }
            );
        } catch (error) {
            console.error('Failed to upload image:', error);
        }
    };

    // Function to handle removing the profile image
    const handleRemoveImage = () => {
        setProfileImage(null); // Clear the image from the state
        const updatedUser = { ...userData, profileImage: null };
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Update localStorage
        setUserData(updatedUser); // Update the userData state

        // Optionally, send a request to remove the image from the backend
        removeImageFromServer();
    };

    // Function to handle removing the image from the backend
    const removeImageFromServer = async () => {
        const userId = userData?._id;
        try {
            await fetch(
                `http://localhost:8080/api/user/${userId}/removeImage`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ profileImage: null }),
                }
            );
        } catch (error) {
            console.error('Failed to remove image from the server:', error);
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('user');
        setUserData(null);
        navigate('/login');
        navigate(0);
    };

    const handleProfileEdit = () => {
        navigate('/profile-edit');
    };

    return (
        <>
            <div className='container'>
                <div className='profile-page'>
                    {userData ? (
                        <div className='profile-show'>
                            <div className='left'>
                                <div className='user-top'>
                                    <i className='ri-profile-fill'></i>
                                    <span>User's Profile</span>
                                </div>
                                <div className='alpha'>
                                    <label htmlFor='file-input'>
                                        {/* Display the profile image if it exists */}
                                        {profileImage ? (
                                            <img
                                                src={profileImage}
                                                alt='Profile'
                                                className='p-show'
                                                style={{
                                                    borderRadius: '20%',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        ) : (
                                            <span className='p-show'>
                                                {userData.username
                                                    ? userData.username
                                                          .split(' ')[0]
                                                          .charAt(0)
                                                          .toUpperCase() +
                                                      (userData.username.split(
                                                          ' '
                                                      )[1]
                                                          ? userData.username
                                                                .split(' ')[1]
                                                                .charAt(0)
                                                          : '')
                                                    : '?'}
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        id='file-input'
                                        type='file'
                                        accept='image/*'
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload} // Handle image upload
                                    />
                                    {/* Remove image button */}
                                    {profileImage && (
                                        <button
                                            className='remove-image-btn'
                                            onClick={handleRemoveImage}
                                        >
                                            Remove Image
                                        </button>
                                    )}
                                </div>
                                <div className='username'>
                                    {userData.username ||
                                        'Username not provided'}
                                </div>
                                <div
                                    className='info'
                                    style={{ marginTop: '-15px' }}
                                >
                                    <i
                                        className='ri-mail-line'
                                        style={{ marginRight: '-10px' }}
                                    ></i>
                                    {userData.email || 'Email not provided'}
                                </div>
                                <div className='info'>
                                    <div className='age item'>
                                        <div>
                                            {userData.personalInfo?.age || '?'}
                                            <span>yrs</span>
                                        </div>
                                        <p>Age</p>
                                    </div>
                                    <div className='height item'>
                                        <div>
                                            {userData.personalInfo?.height ||
                                                '?'}
                                            <span>cm</span>
                                        </div>
                                        <p>Height</p>
                                    </div>
                                    <div className='weight item'>
                                        <div>
                                            {userData.personalInfo?.weight ||
                                                '?'}
                                            <span>kg</span>
                                        </div>
                                        <p>Weight</p>
                                    </div>
                                </div>
                                <div className='your-goals'>
                                    <span className='tgoal'>
                                        Your Fitness Goals:{' '}
                                    </span>
                                    {userData.fitnessGoals?.primaryGoals
                                        .length > 0
                                        ? userData.fitnessGoals.primaryGoals.map(
                                              (goal) => (
                                                  <div
                                                      key={goal}
                                                      className='goal'
                                                  >
                                                      <span>{goal}</span>
                                                  </div>
                                              )
                                          )
                                        : 'No fitness goals set'}
                                </div>
                                <div
                                    className='edit-profile'
                                    onClick={handleProfileEdit}
                                >
                                    <span style={{ fontWeight: '600' }}>
                                        Edit Profile
                                    </span>
                                    <i className='ri-edit-2-fill'></i>
                                </div>
                            </div>
                            <div className='right'>
                                <Overview />
                            </div>
                        </div>
                    ) : (
                        <p>Loading user data...</p>
                    )}
                </div>
            </div>
            <div className='button-logout' onClick={handleLogout}>
                <div className='container button-contaier'>
                    <i className='ri-logout-box-r-line'></i>
                    <span>Logout</span>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
