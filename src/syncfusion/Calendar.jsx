import React, { useState } from 'react';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import './SyncFusion.css';

const CalendarTodoList = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasks, setTasks] = useState({});
    const [newTask, setNewTask] = useState('');

    // Handler for when a date is selected
    const handleDateChange = (event) => {
        const selected = event.value.toLocaleDateString(); // Get the selected date in a readable format
        setSelectedDate(selected); // Set the selected date
    };

    // Add a new task to the selected date
    const addTask = () => {
        if (!selectedDate || !newTask) return;

        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            if (!updatedTasks[selectedDate]) {
                updatedTasks[selectedDate] = [];
            }
            updatedTasks[selectedDate].push(newTask);
            return updatedTasks;
        });
        setNewTask(''); // Clear the input field after adding
    };

    // Delete a task from the list
    const deleteTask = (taskIndex) => {
        if (!selectedDate) return;

        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            updatedTasks[selectedDate].splice(taskIndex, 1);
            if (updatedTasks[selectedDate].length === 0) {
                delete updatedTasks[selectedDate];
            }
            return updatedTasks;
        });
    };

    return (
        <div className='calendar-todo-container'>
            {/* Calendar Component */}
            <div className='calendar-section'>
                <h3>Select a Date</h3>
                <CalendarComponent id='calendar' change={handleDateChange} />
                <p>Selected Date: {selectedDate || 'None'}</p>
            </div>

            {/* To-Do List for the selected date */}
            <div className='todo-section'>
                {selectedDate && (
                    <>
                        <h3>To-Do List for {selectedDate}</h3>
                        <div className='add-task'>
                            <input
                                type='text'
                                placeholder='Add a new task'
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                            <button onClick={addTask}>Add Task</button>
                        </div>

                        <ul>
                            {tasks[selectedDate] &&
                            tasks[selectedDate].length > 0 ? (
                                tasks[selectedDate].map((task, index) => (
                                    <li key={index}>
                                        {task}{' '}
                                        <button
                                            onClick={() => deleteTask(index)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p>No tasks for this date.</p>
                            )}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default CalendarTodoList;
