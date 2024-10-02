import React, { useState } from 'react';
import macroNutrients from './MacroNutrient.json'; // Adjust the path as needed
import './macro.css';

const MacroNutrient = () => {
    const [protein, setProtein] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [fat, setFat] = useState(0);
    const [recommendation, setRecommendation] = useState('');
    const [showRecommendation, setShowRecommendation] = useState(false);

    const handleProteinChange = (e) => {
        setProtein(e.target.value);
    };

    const handleCarbsChange = (e) => {
        setCarbs(e.target.value);
    };

    const handleFatChange = (e) => {
        setFat(e.target.value);
    };

    const calculateCalories = () => {
        const proteinCalories = protein * 4;
        const carbsCalories = carbs * 4;
        const fatCalories = fat * 9;
        return proteinCalories + carbsCalories + fatCalories;
    };

    const getRecommendation = () => {
        const totalCalories = calculateCalories();

        // Example conditions based on your JSON data structure:
        let foundRecommendation = '';
        if (protein < 50) {
            foundRecommendation = macroNutrients.find(
                (item) => item.key === 'lowProtein'
            );
        } else if (carbs < 100) {
            foundRecommendation = macroNutrients.find(
                (item) => item.key === 'lowCarbs'
            );
        } else if (fat < 30) {
            foundRecommendation = macroNutrients.find(
                (item) => item.key === 'lowFat'
            );
        } else {
            foundRecommendation = macroNutrients.find(
                (item) => item.key === 'balanced'
            );
        }

        setRecommendation(
            foundRecommendation
                ? foundRecommendation.recommendations
                : 'No recommendation available.'
        );
        setShowRecommendation(true);
    };

    return (
        <div className='macro-nutrient'>
            <div className='container'>
                <h1>
                    Macro Nutrient <br /> Calculator
                </h1>
                <span className='quote'>
                    Calulate your nutrition diet and get <br /> recommendation
                </span>
                <div className='row '>
                    <div className='col calculation'>
                        <div className='row'>
                            <div>
                                <label>Protein (g):</label>
                                <input
                                    type='number'
                                    value={protein}
                                    onChange={handleProteinChange}
                                />
                            </div>
                            <div>
                                <label>Carbs (g):</label>
                                <input
                                    type='number'
                                    value={carbs}
                                    onChange={handleCarbsChange}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div>
                                <label>Fat (g):</label>
                                <input
                                    type='number'
                                    value={fat}
                                    onChange={handleFatChange}
                                />
                            </div>

                            <div>
                                <button onClick={getRecommendation}>
                                    Get Recommendation
                                </button>
                            </div>
                        </div>
                        <div className='result'>
                            <label>Total Calories:</label>
                            <span>{calculateCalories()}</span>
                        </div>
                    </div>
                    <div className='col'>
                        {showRecommendation && (
                            <div>
                                <h2>Recommendations:</h2>
                                <div>
                                    <h3>Diet:</h3>
                                    <ul>
                                        {recommendation.diet &&
                                            recommendation.diet.map(
                                                (item, index) => (
                                                    <li key={index}>{item}</li>
                                                )
                                            )}
                                    </ul>
                                    <h3>Exercise:</h3>
                                    <ul>
                                        {recommendation.exercise &&
                                            recommendation.exercise.map(
                                                (item, index) => (
                                                    <li key={index}>{item}</li>
                                                )
                                            )}
                                    </ul>
                                    <h3>Nutrition:</h3>
                                    <ul>
                                        {recommendation.nutrition &&
                                            recommendation.nutrition.map(
                                                (item, index) => (
                                                    <li key={index}>{item}</li>
                                                )
                                            )}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MacroNutrient;
