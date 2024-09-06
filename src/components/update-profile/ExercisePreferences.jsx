import React from 'react';

const ExercisePreferences = ({ formData, handleInputChange }) => {
    // Ensure formData has default values
    const {
        favoriteTypes = '',
        preferredEnvironment = '',
        equipmentAvailability = '',
    } = formData;

    return (
        <div className='exercise-preferences'>
            <h3>Exercise Preferences</h3>
            <div className='form-group'>
                <label>Favorite Types of Exercise:</label>
                <input
                    type='text'
                    name='exercisePreferences.favoriteTypes'
                    value={favoriteTypes}
                    onChange={handleInputChange}
                />
            </div>
            <div className='form-group'>
                <label>Preferred Workout Environment:</label>
                <select
                    name='exercisePreferences.preferredEnvironment'
                    value={preferredEnvironment}
                    onChange={handleInputChange}
                >
                    <option value=''>Select Environment</option>
                    <option value='gym'>Gym</option>
                    <option value='home'>Home</option>
                    <option value='outdoors'>Outdoors</option>
                </select>
            </div>
            <div className='form-group'>
                <label>Equipment Availability:</label>
                <input
                    type='text'
                    name='exercisePreferences.equipmentAvailability'
                    value={equipmentAvailability}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default ExercisePreferences;
