import React from 'react';

const Goalsfit = ({ formData, handleInputChange, handleCheckboxChange }) => {
    // Destructuring formData
    const {
        primaryGoals = [],
        targetWeight = '',
        targetTimeframe = '',
    } = formData;

    return (
        <div className='fitness-goal'>
            <h2>Fitness Goals</h2>
            <div>
                <label>Primary Goals:</label>
                <div>
                    <label>
                        <input
                            type='checkbox'
                            value='Weight loss'
                            checked={primaryGoals.includes('Weight loss')}
                            onChange={handleCheckboxChange}
                        />
                        Weight Loss
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            value='Muscle gain'
                            checked={primaryGoals.includes('Muscle gain')}
                            onChange={handleCheckboxChange}
                        />
                        Muscle Gain
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            value='General fitness'
                            checked={primaryGoals.includes('General fitness')}
                            onChange={handleCheckboxChange}
                        />
                        General Fitness
                    </label>
                    <label>
                        <input
                            type='checkbox'
                            value='Endurance improvement'
                            checked={primaryGoals.includes(
                                'Endurance improvement'
                            )}
                            onChange={handleCheckboxChange}
                        />
                        Endurance Improvement
                    </label>
                </div>
            </div>
            <div>
                <label htmlFor='targetWeight'>Target Weight (kg):</label>
                <input
                    type='number'
                    name='fitnessGoals.targetWeight'
                    id='targetWeight'
                    value={targetWeight}
                    onChange={handleInputChange}
                    placeholder='e.g. 70'
                />
            </div>
            <div>
                <label htmlFor='targetTimeframe'>
                    Target Timeframe (months):
                </label>
                <input
                    type='number'
                    name='fitnessGoals.targetTimeframe'
                    id='targetTimeframe'
                    value={targetTimeframe}
                    onChange={handleInputChange}
                    placeholder='e.g. 3'
                />
            </div>
        </div>
    );
};

export default Goalsfit;
