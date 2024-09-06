import React, { useCallback, useEffect, useState } from 'react';
import PersonalInfo from './PersonalInfo';
import './edit.css';
import { useNavigate } from 'react-router-dom';

const Overall = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        personalInfo: {
            height: '',
            weight: '',
            age: '',
            gender: '',
            bmi: '', // Added BMI field
        },
    });

    const [message, setMessage] = useState('');

    // Load user data from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setFormData({
                username: user.username || '',
                email: user.email || '',
                personalInfo: {
                    height: user.personalInfo?.height || '',
                    weight: user.personalInfo?.weight || '',
                    age: user.personalInfo?.age || '',
                    gender: user.personalInfo?.gender || '',
                    bmi: user.personalInfo?.bmi || '',
                },
            });
        }
    }, []);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        const path = name.split('.');
        if (path.length > 1) {
            // For fields inside personalInfo
            setFormData((prevState) => ({
                ...prevState,
                personalInfo: {
                    ...prevState.personalInfo,
                    [path[1]]: value,
                },
            }));
        } else {
            // For username and email
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    }, []);

    const updateUserData = async () => {
        const userId = JSON.parse(localStorage.getItem('user'))?._id;
        if (!userId) {
            setMessage('User not logged in');
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:8080/api/user/${userId}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData), // Send full formData (username, email, and personalInfo)
                }
            );

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                setMessage('Data updated successfully!');
            } else {
                setMessage('Failed to update data');
            }
        } catch (error) {
            setMessage('Error updating data');
            console.error('Update Error:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserData();
    };

    const handleCancel = () => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setFormData({
                username: storedUser.username || '',
                email: storedUser.email || '',
                personalInfo: {
                    height: storedUser.personalInfo?.height || '',
                    weight: storedUser.personalInfo?.weight || '',
                    age: storedUser.personalInfo?.age || '',
                    gender: storedUser.personalInfo?.gender || '',
                    bmi: storedUser.personalInfo?.bmi || '',
                },
            });
        }
        navigate('/profile');
    };

    return (
        <div className='overall-edit'>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <PersonalInfo
                    formData={{
                        ...formData.personalInfo,
                        username: formData.username,
                        email: formData.email,
                    }}
                    handleInputChange={handleInputChange}
                />
                <div className='button-group'>
                    <button type='submit' className='submit'>
                        Update
                    </button>
                    <button
                        type='button'
                        className='btn-cancel'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Overall;
