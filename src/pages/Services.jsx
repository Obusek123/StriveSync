import React from 'react';
import VirtualConsultation from '../components/virtual/VirtualConsultation';

const Services = () => {
    return (
        <div className='services'>
            <div className='container'>
                <h2 className='service-h'>Our Services</h2>
                <p className='service-p'>
                    "Empowering You to Live Healthier and Stronger"
                </p>
                <VirtualConsultation />
            </div>
        </div>
    );
};

export default Services;
