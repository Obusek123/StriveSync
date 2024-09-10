import React, { useState, useEffect } from 'react';

const PersonalInfo = ({ setFormData, setIsFormValid }) => {
    const [formData, setLocalFormData] = useState({
        username: '',
        email: '',
        personalInfo: {
            height: '',
            weight: '',
            age: '',
            gender: '',
            bmi: '',
        },
    });

    // Load user data from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            setLocalFormData({
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

    // Handle input change and update formData state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const path = name.split('.');
        setLocalFormData((prevState) => {
            if (path.length > 1) {
                return {
                    ...prevState,
                    personalInfo: {
                        ...prevState.personalInfo,
                        [path[1]]: value,
                    },
                };
            } else {
                return {
                    ...prevState,
                    [name]: value,
                };
            }
        });
    };

    // Calculate BMI if height and weight are available
    const calculateBMI = (height, weight) => {
        if (height && weight) {
            const heightInMeters = height / 100;
            return (weight / heightInMeters ** 2).toFixed(2);
        }
        return '';
    };

    // Update BMI when height or weight changes
    useEffect(() => {
        const newBmi = calculateBMI(
            formData.personalInfo.height,
            formData.personalInfo.weight
        );
        setLocalFormData((prevState) => ({
            ...prevState,
            personalInfo: {
                ...prevState.personalInfo,
                bmi: newBmi,
            },
        }));
    }, [formData.personalInfo.height, formData.personalInfo.weight]);

    // Pass form data up to Overall.jsx
    useEffect(() => {
        setFormData(formData);
        // Check if form is valid to enable/disable submit button
        const isFormValid =
            formData.username &&
            formData.email &&
            formData.personalInfo.age &&
            formData.personalInfo.height &&
            formData.personalInfo.weight &&
            formData.personalInfo.gender;
        setIsFormValid(isFormValid);
    }, [formData, setFormData, setIsFormValid]);

    return (
        <div className='personal-info'>
            <h2>Personal Information</h2>
            <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='age'>Age</label>
                <input
                    type='number'
                    id='age'
                    name='personalInfo.age'
                    value={formData.personalInfo.age}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='gender'>Gender</label>
                <select
                    id='gender'
                    name='personalInfo.gender'
                    value={formData.personalInfo.gender}
                    onChange={handleInputChange}
                    required
                >
                    <option value=''>Select Gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='height'>Height (cm)</label>
                <input
                    type='number'
                    id='height'
                    name='personalInfo.height'
                    value={formData.personalInfo.height}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='weight'>Weight (kg)</label>
                <input
                    type='number'
                    id='weight'
                    name='personalInfo.weight'
                    value={formData.personalInfo.weight}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='bmi'>BMI</label>
                <input
                    type='text'
                    id='bmi'
                    name='bmi'
                    value={formData.personalInfo.bmi}
                    readOnly
                />
            </div>
        </div>
    );
};

export default PersonalInfo;
