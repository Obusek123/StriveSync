import React, { useEffect, useState } from 'react';
import './overview.css'; // Import CSS for styling

const PassedTask = () => {
    const [passedTasks, setPassedTasks] = useState([]);
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [dateCaloriesMap, setDateCaloriesMap] = useState({}); // To store calories burned per date
    const [message, setMessage] = useState(''); // Optional message for feedback

    // Helper function to get the current date in YYYY-MM-DD format
    const getCurrentDate = () => new Date().toISOString().split('T')[0];

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            if (user.passedTasks) {
                setPassedTasks(user.passedTasks);
            }
            if (user.dateCaloriesMap) {
                setDateCaloriesMap(user.dateCaloriesMap); // Load dateCaloriesMap from localStorage
            }

            // Check if today's calories are already in dateCaloriesMap and set them
            const currentDate = getCurrentDate();
            if (user.dateCaloriesMap && user.dateCaloriesMap[currentDate]) {
                setCaloriesBurned(user.dateCaloriesMap[currentDate]); // Set today's calories
            }
        }
    }, []);

    const updateLocalStorage = (updatedTasks, newDateCaloriesMap) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            user.passedTasks = updatedTasks; // Update the passedTasks in the user object
            user.dateCaloriesMap = newDateCaloriesMap; // Update dateCaloriesMap in the user object
            localStorage.setItem('user', JSON.stringify(user)); // Save the updated user object back to localStorage
        }
    };

    const handleDone = (taskIndex) => {
        const task = passedTasks[taskIndex];
        const newCaloriesBurned = caloriesBurned + task.caloriesBurned;

        const updatedTasks = passedTasks.filter(
            (_, index) => index !== taskIndex
        );
        setPassedTasks(updatedTasks);
        setCaloriesBurned(newCaloriesBurned);

        // Update dateCaloriesMap
        const currentDate = getCurrentDate(); // Get current date as YYYY-MM-DD
        const newDateCaloriesMap = { ...dateCaloriesMap };
        newDateCaloriesMap[currentDate] =
            (newDateCaloriesMap[currentDate] || 0) + task.caloriesBurned;

        updateLocalStorage(updatedTasks, newDateCaloriesMap); // Update localStorage
    };

    const handleUndone = (taskIndex) => {
        const task = passedTasks[taskIndex];
        const updatedTasks = passedTasks.filter(
            (_, index) => index !== taskIndex
        );
        setPassedTasks(updatedTasks);

        // Update dateCaloriesMap
        const currentDate = getCurrentDate(); // Get current date as YYYY-MM-DD
        const newDateCaloriesMap = { ...dateCaloriesMap };
        if (newDateCaloriesMap[currentDate]) {
            newDateCaloriesMap[currentDate] -= task.caloriesBurned; // Decrease calories burned for today
        }

        updateLocalStorage(updatedTasks, newDateCaloriesMap); // Update localStorage without changing totalCalories
    };

    const handleUpdateCalories = async () => {
        const currentDate = getCurrentDate(); // Get current date as YYYY-MM-DD
        const newDateCaloriesMap = { ...dateCaloriesMap };

        // Store current calories burned for today
        newDateCaloriesMap[currentDate] = caloriesBurned;

        // Update localStorage
        updateLocalStorage(passedTasks, newDateCaloriesMap);

        // API call to update calories on the server
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user._id) {
            setMessage('User not found');
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/api/user/${user._id}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        dateCaloriesMap: newDateCaloriesMap,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update calories on the server');
            }

            setMessage(
                `Calories burned for ${currentDate} updated successfully!`
            );
        } catch (error) {
            console.error('Error saving calories to MongoDB:', error);
            setMessage('Error saving calories to server');
        }
    };

    return (
        <div className='passed-task'>
            <h2>Previously Saved Tasks</h2>
            <h3>Calories Burned: {caloriesBurned.toFixed(2)}</h3>
            <button
                onClick={handleUpdateCalories}
                className='update-calories-button'
            >
                Update Calorie Count for Today
            </button>
            <ul>
                {passedTasks.length === 0 ? (
                    <li>No passed tasks available.</li>
                ) : (
                    passedTasks.map((task, index) => (
                        <li key={index} className='task-item'>
                            <div className='content'>
                                <div className='img'>
                                    <img
                                        src={task.image}
                                        alt={task.name}
                                        style={{
                                            height: '40px',
                                            width: '50px',
                                            borderRadius: '5px',
                                        }}
                                    />
                                </div>
                                <div className='info'>
                                    <strong>{task.name}</strong> -{' '}
                                    {task.workoutMinutes} min
                                    <span>
                                        {' '}
                                        | Calories burned:{' '}
                                        {task.caloriesBurned.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className='task-buttons'>
                                <button
                                    onClick={() => handleDone(index)}
                                    className='done-button'
                                >
                                    Done
                                </button>
                                <button
                                    onClick={() => handleUndone(index)}
                                    className='undone-button'
                                >
                                    Undone
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PassedTask;
