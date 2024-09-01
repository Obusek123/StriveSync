import React, { useState } from 'react';
import calorieRecommendations from './calorie.json';
import './calorie.css';

const CalorieCalc = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [activityLevel, setActivityLevel] = useState('sedentary');
    const [calories, setCalories] = useState(null);
    const [recommendation, setRecommendation] = useState(null);

    const calculateBMR = (weight, height, age, gender) => {
        if (gender === 'male') {
            return 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (gender === 'female') {
            return 10 * weight + 6.25 * height - 5 * age - 161;
        }
        return null;
    };

    const calculateTDEE = (bmr, activityLevel) => {
        const activityMultipliers = {
            sedentary: 1.2,
            lightlyActive: 1.375,
            moderatelyActive: 1.55,
            veryActive: 1.725,
            superActive: 1.9,
        };
        return bmr * (activityMultipliers[activityLevel] || 1.2);
    };

    const getRecommendation = (calories) => {
        let category = calorieRecommendations.find((cat) => {
            if (calories < 1500) return cat.key === 'low';
            if (calories < 2500) return cat.key === 'moderate';
            return cat.key === 'high';
        });
        setRecommendation(category);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const bmr = calculateBMR(weight, height, age, gender);
        const tdee = calculateTDEE(bmr, activityLevel);
        setCalories(tdee.toFixed(2));
        getRecommendation(tdee.toFixed(2));
    };

    return (
        <div className='calorie-calculator'>
            <div className='container'>
                <h1>Calorie Calculator</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Weight (kg):</label>
                        <input
                            type='number'
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Height (cm):</label>
                        <input
                            type='number'
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Age (years):</label>
                        <input
                            type='number'
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                    <div>
                        <label>Activity Level:</label>
                        <select
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                        >
                            <option value='sedentary'>Sedentary</option>
                            <option value='lightlyActive'>
                                Lightly Active
                            </option>
                            <option value='moderatelyActive'>
                                Moderately Active
                            </option>
                            <option value='veryActive'>Very Active</option>
                            <option value='superActive'>Super Active</option>
                        </select>
                    </div>
                    <button type='submit'>Calculate</button>
                </form>
                {calories && (
                    <div>
                        <h2>
                            Your Daily Calorie Requirement: {calories}{' '}
                            calories/day
                        </h2>
                        {recommendation && (
                            <div>
                                <h3>Recommendations</h3>
                                <p>{recommendation.range}</p>
                                <h4>Diet</h4>
                                <ul>
                                    {recommendation.recommendations.diet.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>
                                <h4>Exercise</h4>
                                <ul>
                                    {recommendation.recommendations.exercise.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>
                                <h4>Nutrition</h4>
                                <ul>
                                    {recommendation.recommendations.nutrition.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalorieCalc;
