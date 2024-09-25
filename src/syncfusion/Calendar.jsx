import React, { useState } from 'react';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import './SyncFusion.css';

const CalendarTodoList = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    // Handle date selection from the calendar
    const handleDateChange = (event) => {
        const selected = event.value.toLocaleDateString();
        setSelectedDate(selected);
    };

    return (
        <div className='calendar-todo-container'>
            {/* Calendar Component */}
            <div className='calendar-section'>
                <h3>Select a Date</h3>
                <CalendarComponent id='calendar' change={handleDateChange} />
                <p>Selected Date: {selectedDate || 'None'}</p>
            </div>
        </div>
    );
};

export default CalendarTodoList;
