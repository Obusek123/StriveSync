import React, { useState } from 'react';
import axios from 'axios';
import trainer from '../../assets/images/trainer.png';
import './virtual.css';

const VirtualConsultation = () => {
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    // Handle message input change
    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    // Handle sending the message
    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim()) {
            setStatus('Message cannot be empty.');
            return;
        }

        // Proceed with sending the message
        try {
            await axios.post('/api/send-message', {
                message,
                userEmail: 'learnobusek@gmail.com',
            });
            setStatus('Message sent successfully!');
            setMessage('');
        } catch (error) {
            console.error(error);
            setStatus('Failed to send message. Please try again.');
        }
    };

    return (
        <div className='virtual'>
            <div className='row'>
                <div className='col '>
                    <div className='trainer-img intro'>
                        <img
                            style={{
                                height: '200px',
                                width: 'auto',
                                borderRadius: '20px',
                            }}
                            src={trainer}
                            alt=''
                        />
                        <div className='trainer-info'>
                            <span
                                style={{ fontWeight: 'bold', fontSize: '24px' }}
                            >
                                Michael Rushman
                            </span>
                            <span>
                                <i className='ri-phone-line'></i>+977 9893723743
                            </span>
                            <span>
                                <i className='ri-mail-line'></i>
                                <a href='mailto:sabishek817@gmail.com'>
                                    sabishek817@gmail.com
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='col ser-ab'>
                    <h3>Virtual Consultation with Expert</h3>
                    <p>
                        Join our certified personal trainers from the comfort of
                        your home through our virtual consultation feature.
                        Whether you prefer a one-on-one video session or a chat,
                        our fitness experts are here to provide you with
                        personalized guidance, tailored workout plans, and
                        expert advice on your fitness journey. Schedule your
                        appointment easily through our app and get the support
                        you need to achieve your goals, all in real-time. No
                        matter where you are, our trainers are ready to guide
                        you toward a healthier, fitter you.
                    </p>
                </div>
            </div>
            <form onSubmit={handleSend}>
                <textarea
                    value={message}
                    onChange={handleChange}
                    placeholder='The message will be sent to the trainer email'
                    required
                ></textarea>
                <button type='submit'>Send</button>
            </form>
            {status && <p>{status}</p>} {/* Display status message */}
        </div>
    );
};

export default VirtualConsultation;
