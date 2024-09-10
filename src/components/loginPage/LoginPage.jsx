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
        return { success: false, error: 'Sign up failed' };
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
        return { success: false, error: "Email or Password doesn't exist" };
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let success = false;
        let message = '';

        // Validate email format before login or sign up
        if (!validateEmail(formData.email)) {
            setMessage(`Please enter a valid domain`);
            setMessageType('error'); // Set message as error
            return;
        }

        if (change === 'Login') {
            const result = await loginUser(formData.email, formData.password);
            success = result.success;
            message = result.error || "Email or Password doesn't exist";

            if (success) {
                localStorage.setItem('user', JSON.stringify(result.data.user));
                message = 'Login successful!';
                setMessageType('success'); // Set message as success
                navigate('/profile');
                window.location.reload();
            } else {
                setMessageType('error'); // Set message as error
            }
        } else {
            const result = await signUpUser({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            success = result.success;
            message = result.error || 'Sign-up failed';

            if (success) {
                message = 'Sign-up successful! You can now log in.';
                setMessageType('success'); // Set message as success
            } else {
                setMessageType('error'); // Set message as error
            }
        }

        setMessage(message);

        if (success) {
            setFormData({
                username: '',
                email: '',
                password: '',
            });
        }
    };

    const handleSignUpChange = () => {
        setChange(change === 'Sign Up' ? 'Login' : 'Sign Up');
        setMessage(''); // Clear the message when toggling forms
        setMessageType(''); // Reset message type
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='container login-page'>
            <div className='loginSign'>
                <h2>{change}</h2>
                {message && (
                    <p
                        style={{
                            color: messageType === 'error' ? 'red' : 'green',
                        }}
                    >
                        {message}
                    </p>
                )}
                {change === 'Sign Up' ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='username'>Username</label>
                            <input
                                type='text'
                                name='username'
                                placeholder='Username'
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                autoComplete='username'
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                autoComplete='email'
                            />
                        </div>
                        <div className='password-container'>
                            <label htmlFor='password'>Password</label>
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
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>
                        <button type='submit'>Sign Up</button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                autoComplete='email'
                            />
                        </div>
                        <div className='password-container'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Password'
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                                autoComplete='current-password'
                            />
                            <i
                                className={`fa ${
                                    showPassword ? 'fa-eye-slash' : 'fa-eye'
                                } password-icon`}
                                onClick={togglePasswordVisibility}
                            ></i>
                        </div>
                        <button type='submit'>Login</button>
                    </form>
                )}
                <p onClick={handleSignUpChange}>
                    {change === 'Sign Up'
                        ? 'Already have an account? Login'
                        : "Don't have an account? Sign Up"}
                </p>
            </div>
            <img src={loginImg} alt='' />
        </div>
    );
};

export default LoginPage;
