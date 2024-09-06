import React, { useEffect, useState } from 'react';

const PersonalInfo = ({ formData, handleInputChange }) => {
    const {
        username = '',
        email = '',
        age = '',
        gender = '',
        height = '',
        weight = '',
        bmi = '',
    } = formData;

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
        const newBmi = calculateBMI(height, weight);
        handleInputChange({
            target: { name: 'personalInfo.bmi', value: newBmi },
        }); // Notify parent
    }, [height, weight, handleInputChange]);

    return (
        <div className='personal-info'>
            <h2>Personal Information</h2>
            <div className='form-group'>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    value={username}
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
                    value={email}
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
                    value={age}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='gender'>Gender</label>
                <select
                    id='gender'
                    name='personalInfo.gender'
                    value={gender}
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
                    value={height}
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
                    value={weight}
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
                    value={calculateBMI(height, weight)} // Display calculated BMI
                    readOnly
                />
            </div>
        </div>
    );
};

export default PersonalInfo;
