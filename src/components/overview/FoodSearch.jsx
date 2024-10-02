import React, { useState } from 'react';
import './overview.css'; // Import the CSS file for styling

const FoodSearch = () => {
    const [foodInput, setFoodInput] = useState('');
    const [quantity, setQuantity] = useState(100); // Default quantity in grams
    const [foodData, setFoodData] = useState(null);
    const [totalCalories, setTotalCalories] = useState(0);
    const [error, setError] = useState(null);
    const [savedFoods, setSavedFoods] = useState([]); // To store saved food items

    const apiKey = 'TLH3qEfh88PgF005TZxD2Q==uA4mWUMobpJMJOys';
    const apiHost = 'api.calorieninjas.com';

    const searchFood = async () => {
        if (!foodInput) {
            alert('Please enter a food name');
            return;
        }

        const encodedFoodName = encodeURIComponent(foodInput);
        const url = `https://${apiHost}/v1/nutrition?query=${encodedFoodName}`;

        const options = {
            method: 'GET',
            headers: {
                'X-Api-Key': apiKey,
            },
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log('Full API Response:', data); // Debugging

            if (data.items && data.items.length > 0) {
                const caloriesPer100g = data.items[0].calories;
                // Calculate total calories based on quantity (assuming the quantity is in grams)
                const calculatedCalories = (caloriesPer100g * quantity) / 100;
                setFoodData(data.items[0]); // Get the first result
                setTotalCalories(calculatedCalories);
                setError(null);
            } else {
                setError('No food found.');
                setFoodData(null);
                setTotalCalories(0);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('There was an error fetching data. Please try again.');
            setFoodData(null);
            setTotalCalories(0);
        }
    };

    const addFoodToList = () => {
        if (foodData) {
            const foodToAdd = {
                name: foodData.name,
                quantity,
                calories: totalCalories,
            };
            setSavedFoods([...savedFoods, foodToAdd]);
            setFoodInput('');
            setQuantity(100);
            setFoodData(null);
            setTotalCalories(0);
        } else {
            alert('No food data available to add.');
        }
    };

    const getTotalCaloriesFromSavedFoods = () => {
        return savedFoods.reduce((total, food) => total + food.calories, 0);
    };

    return (
        <div className='food-search'>
            {' '}
            {/* Updated class name here */}
            <h1>Food Search</h1>
            <input
                type='text'
                value={foodInput}
                onChange={(e) => setFoodInput(e.target.value)}
                placeholder='Enter food name'
            />
            <input
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder='Enter quantity in grams'
            />
            <button onClick={searchFood}>Search</button>
            <button onClick={addFoodToList} disabled={!foodData}>
                Add Food
            </button>
            {error && <p className='error'>{error}</p>}
            {foodData && (
                <div>
                    <h2>Food Details</h2>
                    <p>
                        <strong>Name:</strong> {foodData.name}
                    </p>
                    <p>
                        <strong>Calories per 100g:</strong> {foodData.calories}
                    </p>
                    <p>
                        <strong>Total Calories for {quantity}g:</strong>{' '}
                        {totalCalories.toFixed(2)}
                    </p>
                    <p>
                        <strong>Protein:</strong> {foodData.protein_g}g
                    </p>
                    <p>
                        <strong>Fat:</strong> {foodData.fat_total_g}g
                    </p>
                    <p>
                        <strong>Carbs:</strong> {foodData.carbohydrates_total_g}
                        g
                    </p>
                </div>
            )}
            <h2>Saved Foods</h2>
            {savedFoods.length > 0 ? (
                <ul>
                    {savedFoods.map((food, index) => (
                        <li key={index}>
                            {food.name} - {food.quantity}g:{' '}
                            {food.calories.toFixed(2)} calories
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No saved foods.</p>
            )}
            <h3>
                Total Calories from Saved Foods:{' '}
                {getTotalCaloriesFromSavedFoods().toFixed(2)}
            </h3>
        </div>
    );
};

export default FoodSearch;
