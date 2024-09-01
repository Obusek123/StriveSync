// src/api.js

const BASE_URL = 'http://localhost:8080'; // Base URL for your API

/**
 * Function to handle user login
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Object} - Response data with success status and user data or error message
 */
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            // Handle non-2xx responses
            const errorData = await response.json();
            throw new Error(errorData.error || 'Login failed');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Function to handle user sign-up
 * @param {Object} userData - User data including username, email, password, and optional BMI
 * @returns {Object} - Response data with success status and user data or error message
 */
export const signUpUser = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/strivesync-user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            // Handle non-2xx responses
            const errorData = await response.json();
            throw new Error(errorData.error || 'Sign up failed');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Sign up error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Function to update user information
 * @param {string} email - User's email to identify the record
 * @param {Object} updatedData - The data to update (e.g., address, BMI)
 * @returns {Object} - Response data with success status and updated user data or error message
 */
export const updateUser = async (email, updatedData) => {
    try {
        const response = await fetch(`${BASE_URL}/strivesync-user/${email}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            // Handle non-2xx responses
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update user');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Update error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Function to get user information
 * @param {string} email - User's email to fetch their data
 * @returns {Object} - Response data with success status and user data or error message
 */
export const getUserData = async (email) => {
    try {
        const response = await fetch(`${BASE_URL}/strivesync-user/${email}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            // Handle non-2xx responses
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch user data');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching user data:', error);
        return { success: false, error: error.message };
    }
};

// Additional API utility functions can be added here...
