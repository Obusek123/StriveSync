import React from 'react';

const DietaryPreferences = ({ formData, handleInputChange }) => {
    // Ensure formData has default values
    const { dietType = '', foodAllergies = '', caloricIntake = '' } = formData;

    return (
        <div className='dietary-preferences'>
            <h3>Dietary Preferences</h3>
            <div className='form-group'>
                <label>Diet Type:</label>
                <select
                    name='dietaryPreferences.dietType'
                    value={dietType}
                    onChange={handleInputChange}
                >
                    <option value=''>Select Diet Type</option>
                    <option value='vegetarian'>Vegetarian</option>
                    <option value='vegan'>Vegan</option>
                    <option value='non-vegetarian'>Non-Vegetarian</option>
                </select>
            </div>
            <div className='form-group'>
                <label>Food Allergies:</label>
                <input
                    type='text'
                    name='dietaryPreferences.foodAllergies'
                    value={foodAllergies}
                    onChange={handleInputChange}
                />
            </div>
            <div className='form-group'>
                <label>Caloric Intake Preferences:</label>
                <input
                    type='text'
                    name='dietaryPreferences.caloricIntake'
                    value={caloricIntake}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default DietaryPreferences;
