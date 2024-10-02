import React, { useState, useEffect } from 'react';
import exercises from './exercise'; // Import your exercise data
import './task.css';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique IDs

const Task = () => {
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [totalCalories, setTotalCalories] = useState(0);
    const [hasPrimaryGoals, setHasPrimaryGoals] = useState(false);
    const [addedTasks, setAddedTasks] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (
            user &&
            user.fitnessGoals &&
            user.fitnessGoals.primaryGoals.length > 0
        ) {
            setHasPrimaryGoals(true);
            filterExercises(user.fitnessGoals.primaryGoals);
        } else {
            setHasPrimaryGoals(false);
        }
    }, []);

    const filterExercises = (goals) => {
        const normalizedGoals = goals.map((goal) => goal.toLowerCase());

        const filtered = exercises.filter((exercise) =>
            exercise.goals.some((goal) =>
                normalizedGoals.includes(goal.toLowerCase())
            )
        );

        setFilteredExercises(filtered);
    };

    const handleAddTask = (exercise, workoutMinutes) => {
        const caloriesBurned =
            (workoutMinutes / 10) * exercise.caloriesBurnedPer10Mins;

        setAddedTasks((prevTasks) => {
            const existingTaskIndex = prevTasks.findIndex(
                (task) => task.name === exercise.name
            );

            if (existingTaskIndex !== -1) {
                // If the task already exists, update the workout minutes and calories
                const updatedTasks = [...prevTasks];
                updatedTasks[existingTaskIndex] = {
                    ...updatedTasks[existingTaskIndex],
                    workoutMinutes:
                        updatedTasks[existingTaskIndex].workoutMinutes +
                        Number(workoutMinutes),
                    caloriesBurned:
                        updatedTasks[existingTaskIndex].caloriesBurned +
                        caloriesBurned,
                };
                return updatedTasks;
            } else {
                // Add the new task if it doesn't exist
                return [
                    ...prevTasks,
                    {
                        _id: uuidv4(), // Generate a unique ID for the task
                        name: exercise.name,
                        image: exercise.image,
                        workoutMinutes: Number(workoutMinutes),
                        caloriesBurned: caloriesBurned,
                    },
                ];
            }
        });

        setTotalCalories((prevTotal) => prevTotal + caloriesBurned);
    };

    const handleRemoveTask = (taskIndex) => {
        const taskToRemove = addedTasks[taskIndex];
        setTotalCalories(
            (prevTotal) => prevTotal - taskToRemove.caloriesBurned
        );
        setAddedTasks((prevTasks) =>
            prevTasks.filter((_, index) => index !== taskIndex)
        );
    };

    const handleSaveToProfile = () => {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const updatedUser = {
            ...user,
            passedTasks: addedTasks,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setAddedTasks([]);
    };

    if (!hasPrimaryGoals) {
        return <p>No primary fitness goals set!</p>;
    }

    return (
        <div className='task'>
            <h2>Today's Workouts</h2>
            <h3>Total Calories Burned: {totalCalories.toFixed(2)}</h3>
            <div className='task-container'>
                <div className='exercise-list'>
                    {filteredExercises.length === 0 ? (
                        <p>You have completed all your tasks!</p>
                    ) : (
                        <ul>
                            {filteredExercises.map((exercise, index) => (
                                <li key={index}>
                                    <div className='items'>
                                        <strong>{exercise.name}</strong>
                                        <div className='img'>
                                            <img
                                                src={exercise.image}
                                                alt={exercise.name}
                                                style={{
                                                    height: '100px',
                                                    width: '150px', // Keep image dimensions
                                                }}
                                            />
                                        </div>
                                        <span>{exercise.instructions}</span>
                                        <div>
                                            Workout time: 10min <br />
                                            Calories burned:{' '}
                                            {
                                                exercise.caloriesBurnedPer10Mins
                                            }{' '}
                                            kcal
                                        </div>
                                        <div className='add-task'>
                                            <input
                                                type='number'
                                                placeholder='Minutes'
                                                min='1'
                                                style={{ marginRight: '5px' }}
                                            />
                                            <button
                                                onClick={(e) => {
                                                    const workoutMinutes =
                                                        e.target.previousSibling
                                                            .value;
                                                    if (workoutMinutes) {
                                                        handleAddTask(
                                                            exercise,
                                                            workoutMinutes
                                                        );
                                                        e.target.previousSibling.value =
                                                            '';
                                                    }
                                                }}
                                            >
                                                Add Task
                                            </button>
                                        </div>
                                    </div>
                                    <div className='icon-container'>
                                        <i className='ri-error-warning-line'></i>
                                        <div className='popup'>
                                            <strong>Outcome:</strong>{' '}
                                            {exercise.outcome}
                                            <br />
                                            <strong>Goals:</strong>{' '}
                                            {exercise.goals.join(', ')}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className='todo-list'>
                    <h3>My Tasks</h3>
                    <ul>
                        {addedTasks.length > 0 ? (
                            addedTasks.map((task, index) => (
                                <li key={task._id} className='todo-task'>
                                    <div className='content'>
                                        <img
                                            src={task.image}
                                            alt={task.name}
                                            style={{
                                                height: '40px',
                                                width: '50px',
                                            }}
                                        />
                                        <div className='task-info'>
                                            <strong>{task.name}</strong> -{' '}
                                            {task.workoutMinutes} min
                                            <span>
                                                {' '}
                                                | Calories burned:{' '}
                                                {task.caloriesBurned.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => handleRemoveTask(index)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p>Start adding tasks to see them here!</p> // This is the random text
                        )}
                    </ul>
                    {addedTasks.length > 0 && (
                        <button onClick={handleSaveToProfile} className='save'>
                            Save Tasks to Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Task;
