import React, { useState } from 'react';

// Example JSON data for recommendations
const recommendationsData = [
    {
        key: 'lowProtein',
        range: 'Protein < 50g',
        recommendations: {
            diet: [
                'Increase protein intake with protein-rich foods such as chicken, fish, and legumes.',
                'Consider protein supplements if necessary.',
                'Monitor protein intake to ensure muscle maintenance.',
            ],
            exercise: [
                'Include strength training exercises to build muscle.',
                'Ensure a balanced workout regimen including cardio and strength training.',
                'Track progress and adjust protein intake accordingly.',
            ],
            nutrition: [
                'Ensure adequate intake of other nutrients to compensate for low protein.',
                'Include a variety of nutrient-dense foods in your diet.',
                'Consult a nutritionist if you have specific dietary needs.',
            ],
        },
    },
    {
        key: 'balanced',
        range: '50g ≤ Protein ≤ 70g',
        recommendations: {
            diet: [
                'Maintain a balanced diet with a mix of protein, fats, and carbohydrates.',
                'Include lean proteins, healthy fats, and whole grains.',
                'Monitor portion sizes to maintain energy levels.',
            ],
            exercise: [
                'Incorporate a balanced workout routine including cardio and strength training.',
                'Ensure regular physical activity to support overall health.',
                'Adjust exercise intensity based on energy levels.',
            ],
            nutrition: [
                'Focus on a well-rounded intake of nutrients to support overall health.',
                'Stay hydrated and include a variety of foods in your diet.',
                'Monitor your nutrition intake to ensure balanced eating.',
            ],
        },
    },
    {
        key: 'highProtein',
        range: 'Protein > 70g',
        recommendations: {
            diet: [
                'Increase intake of protein-rich foods to meet your needs.',
                'Include protein supplements if necessary for muscle growth.',
                'Monitor intake to avoid excessive protein consumption.',
            ],
            exercise: [
                'Focus on strength training to leverage increased protein intake.',
                'Include high-intensity workouts to maximize muscle gain.',
                'Ensure proper rest and recovery between workouts.',
            ],
            nutrition: [
                'Balance your diet with sufficient carbohydrates and fats.',
                'Include foods rich in vitamins and minerals to support overall health.',
                'Consult a nutritionist to optimize your diet for muscle growth.',
            ],
        },
    },
];

const MacroNutrient = () => {
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [carbs, setCarbs] = useState('');
    const [recommendations, setRecommendations] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('Protein:', protein); // Log protein value
        console.log('Recommendations Data:', recommendationsData); // Log recommendations data

        let recommendation = recommendationsData.find((rec) => {
            const rangeParts = rec.range.split(' ');
            const lowerBound = parseInt(rangeParts[1].replace('g', ''));
            const upperBound = parseInt(
                rangeParts[3]?.replace('g', '') || Infinity
            );
            const proteinValue = parseInt(protein);

            console.log('Range Check:', proteinValue, lowerBound, upperBound); // Log range check

            if (rec.range.includes('<')) {
                return proteinValue < lowerBound;
            } else if (rec.range.includes('≤')) {
                return proteinValue >= lowerBound && proteinValue <= upperBound;
            } else if (rec.range.includes('≥')) {
                return proteinValue >= lowerBound;
            }
            return false;
        });

        console.log('Selected Recommendation:', recommendation); // Log selected recommendation

        setRecommendations(
            recommendation ? recommendation.recommendations : null
        );
    };

    return (
        <div>
            <h1>Macro Nutrient Calculator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Protein (g):</label>
                    <input
                        type='number'
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fat (g):</label>
                    <input
                        type='number'
                        value={fat}
                        onChange={(e) => setFat(e.target.value)}
                    />
                </div>
                <div>
                    <label>Carbohydrates (g):</label>
                    <input
                        type='number'
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                    />
                </div>
                <button type='submit'>Get Recommendations</button>
            </form>
            {recommendations && (
                <div>
                    <h2>Recommendations</h2>
                    <div>
                        <h3>Diet</h3>
                        <ul>
                            {recommendations.diet.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Exercise</h3>
                        <ul>
                            {recommendations.exercise.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Nutrition</h3>
                        <ul>
                            {recommendations.nutrition.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MacroNutrient;
