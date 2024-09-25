import React, { useState, useEffect } from 'react';
import exercises from './exercise'; // Import your exercise data
import './task.css';

const Task = () => {
    const [filteredExercises, setFilteredExercises] = useState([]); // Store filtered exercises
    const [totalCalories, setTotalCalories] = useState(0);
    const [hasPrimaryGoals, setHasPrimaryGoals] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')); // Fetch user from localStorage
        if (
            user &&
            user.fitnessGoals &&
            user.fitnessGoals.primaryGoals.length > 0
        ) {
            setHasPrimaryGoals(true);
            filterExercises(user.fitnessGoals.primaryGoals); // Filter exercises based on goals
        } else {
            setHasPrimaryGoals(false);
        }
    }, []);

    const filterExercises = (goals) => {
        const normalizedGoals = goals.map((goal) => goal.toLowerCase()); // Normalize the goals to lower case

        const filtered = exercises.filter((exercise) =>
            exercise.goals.some((goal) =>
                normalizedGoals.includes(goal.toLowerCase())
            )
        );

        setFilteredExercises(filtered.slice(0, 9)); // Limit to 9 exercises
    };

    const handleDone = (exercise) => {
        setTotalCalories(totalCalories + exercise.caloriesBurnedPer10Mins);
        setFilteredExercises(filteredExercises.filter((w) => w !== exercise)); // Remove from the list
    };

    const handleUndone = (exercise) => {
        setFilteredExercises(filteredExercises.filter((w) => w !== exercise)); // Remove from the list
    };

    const handleChange = (index) => {
        const newWorkout = getRandomWorkouts(1)[0]; // Get one random new workout
        setFilteredExercises(
            filteredExercises.map((w, i) => (i === index ? newWorkout : w))
        ); // Replace the workout
    };

    function getRandomWorkouts(num) {
        const shuffled = [...exercises].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    if (!hasPrimaryGoals) {
        return <p>No primary fitness goals set!</p>;
    }

    return (
        <div className='task'>
            <h2>Today's Workouts</h2>
            <h3>Total Calories Burned: {totalCalories}</h3>
            {filteredExercises.length === 0 ? (
                <p>You have completed all your tasks!</p>
            ) : (
                <ul>
                    {filteredExercises.map((exercise, index) => (
                        <li key={index}>
                            <div className='items'>
                                <div className='icon-container'>
                                    <i className='ri-error-warning-line'></i>
                                    <div className='popup'>
                                        <p>
                                            <span
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'black',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Outcome:
                                            </span>{' '}
                                            {exercise.outcome}
                                        </p>
                                        <p>
                                            <span
                                                style={{
                                                    fontWeight: 'bold',
                                                    color: 'black',
                                                    fontSize: '16px',
                                                }}
                                            >
                                                Goals:
                                            </span>{' '}
                                            {exercise.goals.join(', ')}
                                        </p>
                                    </div>
                                </div>
                                <strong>{exercise.name}</strong>
                                <div className='img'>
                                    <img
                                        src={exercise.image}
                                        alt='exercise-name'
                                        style={{
                                            height: '75px',
                                            width: 'auto',
                                        }}
                                    />
                                </div>
                                <span>{exercise.instructions}</span>
                                Workout time: 10min <br /> Calories burned:{' '}
                                {exercise.caloriesBurnedPer10Mins}kcal
                                <div className='buttons'>
                                    <button
                                        style={{
                                            backgroundColor: 'lightgreen',
                                        }}
                                        onClick={() => handleDone(exercise)}
                                    >
                                        Done
                                    </button>
                                    <button
                                        style={{
                                            backgroundColor: '#d98f8f',
                                            color: 'white',
                                        }}
                                        onClick={() => handleUndone(exercise)}
                                    >
                                        Undone
                                    </button>
                                    <button
                                        style={{ backgroundColor: 'yellow' }}
                                        onClick={() => handleChange(index)}
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Task;
