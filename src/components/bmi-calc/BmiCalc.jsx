import React, { useState } from 'react';
import './bmi.css';
import bmiRecommendations from './bmiCategory.json';

const BmiCalc = () => {
    const [feet, setFeet] = useState('');
    const [inches, setInches] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [bmi, setBmi] = useState(null);
    const [bmiCategory, setBmiCategory] = useState('');
    const [recommendations, setRecommendations] = useState(null);

    const calculateBmi = () => {
        if (feet !== '' && inches !== '' && weight !== '') {
            const heightInMeters =
                (parseInt(feet) * 12 + parseInt(inches)) * 0.0254;
            const weightInKg = parseFloat(weight);
            const bmiValue = weightInKg / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(2));

            // Determine BMI category and fetch recommendations
            let category = '';
            if (bmiValue < 18.5) {
                category = 'Underweight';
            } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
                category = 'Normal Weight';
            } else if (bmiValue >= 25 && bmiValue < 29.9) {
                category = 'Overweight';
            } else if (bmiValue >= 30) {
                category = 'Obesity';
            }

            setBmiCategory(category);

            if (category) {
                const recs =
                    bmiRecommendations.bmiCategories[category]?.recommendations;
                if (recs) {
                    setRecommendations(recs);
                } else {
                    console.error(
                        'Recommendations not found for category:',
                        category
                    );
                }
            }
        } else {
            console.warn('Please fill out all fields.');
        }
    };

    const bmiCategoriesArray = [
        { key: 'underweight', range: 'BMI < 18.5', status: 'Underweight' },
        {
            key: 'normalWeight',
            range: '18.5 ≤ BMI < 24.9',
            status: 'Normal Weight',
        },
        { key: 'overweight', range: '25 ≤ BMI < 29.9', status: 'Overweight' },
        { key: 'obesity', range: 'BMI ≥ 30', status: 'Obesity' },
    ];

    return (
        <div className='container'>
            <div className='bmi'>
                <div className='bmi-head'>
                    <h1 className='bmi-heading'>BMI Calculator</h1>
                    <span>
                        Calculating your Body Mass Index in just a few <br />{' '}
                        clicks
                    </span>
                </div>
                <div className='bmi-output'>
                    <div className='bmi-calc'>
                        <div className='bmi-main'>
                            <div className='bmi-input'>
                                <div className='age-gender'>
                                    <label htmlFor='' className='age'>
                                        Age
                                        <input type='text' />
                                    </label>
                                    <label className='gender'>
                                        Gender
                                        <select
                                            value={gender}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                        >
                                            <option value=''>Select</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>
                                                Female
                                            </option>
                                            <option value='Other'>Other</option>
                                        </select>
                                    </label>
                                </div>
                                <label htmlFor='' className='height'>
                                    <div>Height</div>
                                    <div className='text-feet'>
                                        <input
                                            type='text'
                                            value={feet}
                                            placeholder='ft'
                                            onChange={(e) =>
                                                setFeet(e.target.value)
                                            }
                                        />
                                        <input
                                            type='text'
                                            value={inches}
                                            placeholder='In'
                                            onChange={(e) =>
                                                setInches(e.target.value)
                                            }
                                        />
                                    </div>
                                </label>
                                <div className='wt-btn'>
                                    <label className='weight'>
                                        Weight
                                        <input
                                            type='text'
                                            value={weight}
                                            placeholder='kg'
                                            onChange={(e) =>
                                                setWeight(e.target.value)
                                            }
                                        />
                                    </label>
                                    <button onClick={calculateBmi}>
                                        Submit
                                    </button>
                                </div>
                                {bmi && (
                                    <div className='bmi-result'>
                                        {weight === '' ||
                                        feet === '' ||
                                        inches === '' ? (
                                            <span>
                                                Fulfill the detail completely
                                            </span>
                                        ) : (
                                            <>
                                                <span>Your BMI is {bmi}</span>
                                                <h3>
                                                    Your BMI category is:{' '}
                                                    {bmiCategory}
                                                </h3>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='bmi-recommendation'>
                        <span>BMI Categories</span>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ranges</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bmiCategoriesArray.map((category) => (
                                    <tr key={category.key}>
                                        <td>{category.range}</td>
                                        <td>{category.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {recommendations && (
                            <div className='recommendations'>
                                <h2>Recommendations</h2>
                                <h3>Diet</h3>
                                <ul>
                                    {recommendations.diet.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                                <h3>Exercise</h3>
                                <ul>
                                    {recommendations.exercise.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>
                                <h3>Nutrition</h3>
                                <ul>
                                    {recommendations.nutrition.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>
                                <h3>Psychological</h3>
                                <ul>
                                    {recommendations.psychological.map(
                                        (item, index) => (
                                            <li key={index}>{item}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                        {bmi && (
                            <div className='bmi-recommendation-result'></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BmiCalc;
