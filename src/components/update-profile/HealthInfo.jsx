import React from 'react';

const HealthInfo = ({ formData, handleInputChange }) => {
    // Ensure formData has default values
    const { medicalConditions = '', injuriesOrRestrictions = '' } = formData;

    return (
        <div className='health-info'>
            <h3>Health Information</h3>
            <div className='form-group'>
                <label>Medical Conditions:</label>
                <input
                    type='text'
                    name='healthInfo.medicalConditions'
                    value={medicalConditions}
                    onChange={handleInputChange}
                />
            </div>
            <div className='form-group'>
                <label>Injuries or Restrictions:</label>
                <input
                    type='text'
                    name='healthInfo.injuriesOrRestrictions'
                    value={injuriesOrRestrictions}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default HealthInfo;
