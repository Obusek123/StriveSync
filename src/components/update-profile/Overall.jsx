import React, { useState } from 'react';
import PersonalInfo from './PersonalInfo';

const Overall = () => {
    const [formData, setFormData] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [message, setMessage] = useState('');

    // Submit form data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem('user'))?._id;
        if (!userId) {
            setMessage('User not logged in');
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:8080/api/user/${userId}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data));
                setMessage('Data updated successfully!');
            } else {
                setMessage('Failed to update data');
            }
        } catch (error) {
            setMessage('Error updating data');
            console.error('Update Error:', error);
        }
    };

    const handleCancel = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setFormData(JSON.parse(storedUser));
        }
    };

    return (
        <div className='overall-edit'>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <PersonalInfo
                    setFormData={setFormData}
                    setIsFormValid={setIsFormValid}
                />
                <div className='button-group'>
                    <button
                        type='submit'
                        className='submit'
                        disabled={!isFormValid}
                    >
                        Update
                    </button>
                    <button
                        type='button'
                        className='btn-cancel'
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Overall;
