import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../../assets/images/login-img.png';
import './login.css';

const validateEmail = (email) => {
    const domain = 'gmail.com'; // Replace with your desired domain
    const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@${domain}$`);
    return emailRegex.test(email);
};

const signUpUser = async (userData) => {
    try {
        const response = await fetch('http://localhost:8080/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Sign up error:', error);
        return { success: false, error: '*Sign up failed' };
    }
};

const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return { success: response.ok, data };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: "*Email or Password doesn't exist" };
    }
};

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [change, setChange] = useState('Sign Up');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // Track message type ('error' or 'success')
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Password validation function to check length between 8 and 26 characters
    const validatePassword = (password) => {
        return password.length >= 8 && password.length <= 26;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let success = false;
        let message = '';

        // Validate email format before login or sign up
        if (!validateEmail(formData.email)) {
            setMessage('*Please enter a valid domain');
            setMessageType('error');
            return;
        }

        // Validate password length
        if (!validatePassword(formData.password)) {
            setMessage('*Password must be between 8 and 26 characters.');
            setMessageType('error');
            return;
        }

        if (change === 'Login') {
            const result = await loginUser(formData.email, formData.password);
            success = result.success;
            message = result.error || "*Email or Password doesn't exist";

            if (success) {
                localStorage.setItem('user', JSON.stringify(result.data.user));
                localStorage.setItem('loginDate', new Date().toISOString()); // Store login date
                message = 'Login successful';
                navigate('/profile'); // Redirect to profile after successful login
            }
        } else {
            const result = await signUpUser(formData);
            success = result.success;
            message = result.data.message || 'Sign up successful';

            if (success) {
                localStorage.setItem('user', JSON.stringify(result.data.user));
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                });
            }
        }

        setMessage(message);
        setMessageType(success ? 'success' : 'error');
    };

    const handlePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className='login-page'>
            <div className='login-container container'>
                <form onSubmit={handleSubmit} className='login-form'>
                    {message && (
                        <div className={`message ${messageType}`}>
                            {message}
                        </div>
                    )}
                    {change === 'Sign Up' && (
                        <input
                            type='text'
                            name='username'
                            placeholder='Username'
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    )}
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <div className='password-field'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            autoComplete='new-password'
                        />
                        <i
                            className={`fa ${
                                showPassword ? 'fa-eye-slash' : 'fa-eye'
                            } password-icon`}
                            onClick={handlePasswordVisibility}
                        ></i>
                    </div>
                    <button type='submit' className='submit-button'>
                        {change}
                    </button>
                    <p className='toggle-form'>
                        {change === 'Login'
                            ? "Don't have an account? "
                            : 'Already have an account? '}
                        <span
                            onClick={() => {
                                setChange(
                                    change === 'Login' ? 'Sign Up' : 'Login'
                                );
                            }}
                        >
                            {change === 'Login' ? 'Sign Up' : 'Login'}
                        </span>
                    </p>
                </form>
                <img src={loginImg} alt='Login' className='login-image' />
            </div>
        </div>
    );
};

export default LoginPage;
