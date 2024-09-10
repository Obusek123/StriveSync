import React, { useEffect, useState } from 'react';
import { fetchData, exercisesOptions } from '../../utils/fetchData';
import HorizontalScrollBar from './HorizontalScrollBar';
import './exercises.css';

const Exercises = () => {
    const [search, setSearch] = useState('');
    const [exercises, setExercises] = useState([]);
    const [bodyParts, setBodyParts] = useState([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState('all');

    // Fetch body parts on component mount
    useEffect(() => {
        const fetchBodyParts = async () => {
            const bodyPartsData = await fetchData(
                'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
                exercisesOptions
            );
            setBodyParts(['all', ...bodyPartsData]);
        };
        fetchBodyParts();
    }, []);

    // Fetch exercises based on search or body part
    const fetchExercises = async () => {
        const exerciseData = await fetchData(
            'https://exercisedb.p.rapidapi.com/exercises?limit=999',
            exercisesOptions
        );
        return exerciseData;
    };

    const handleSearch = async () => {
        const exerciseData = await fetchExercises();
        const filteredExercises = exerciseData.filter(
            (exercise) =>
                (search && exercise.name.toLowerCase().includes(search)) ||
                (selectedBodyPart !== 'all' &&
                    exercise.bodyPart === selectedBodyPart) ||
                exercise.target.toLowerCase().includes(search) ||
                exercise.equipment.toLowerCase().includes(search)
        );
        setExercises(filteredExercises);
    };

    // Handle body part selection
    const handleBodyPartSelection = async (bodyPart) => {
        setSelectedBodyPart(bodyPart);
        const exerciseData = await fetchExercises();
        const filteredExercises = exerciseData.filter(
            (exercise) => bodyPart === 'all' || exercise.bodyPart === bodyPart
        );
        setExercises(filteredExercises);
    };

    useEffect(() => {
        handleSearch();
    }, [search, selectedBodyPart]);

    return (
        <div className='Exercises'>
            <div className='container'>
                <h2>Awesome Exercises you should know</h2>

                {/* Search Bar */}
                <div className='search-bar'>
                    <input
                        type='text'
                        placeholder='Search for Exercises'
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value.toLowerCase())
                        }
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>

                {/* Horizontal Scroll for Body Parts */}
                <HorizontalScrollBar
                    data={bodyParts}
                    bodyPart={selectedBodyPart}
                    setBodyPart={handleBodyPartSelection}
                />

                {/* Exercises List */}
                <div className='exercises-list'>
                    {exercises.length ? (
                        exercises.map((exercise) => (
                            <div key={exercise.id} className='exercise-item'>
                                <img
                                    src={exercise.gifUrl}
                                    alt={exercise.name}
                                    className='exercise-image'
                                />
                                <div className='exercise-info'>
                                    <h3>{exercise.name}</h3>
                                    <p>Body Part: {exercise.bodyPart}</p>
                                    <p>Equipment: {exercise.equipment}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No exercises found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Exercises;
