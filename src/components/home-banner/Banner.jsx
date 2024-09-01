import React from 'react';
import './banner.css';
import bannerImg from '../../assets/images/banner-img.png';
import { BrowserRouter, Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='container'>
            <div className='banner'>
                <div className='banner-img'>
                    <img src={bannerImg} alt='Banner Image' />
                </div>
                <div className='banner-left'>
                    <h1>We help people to reach their fitness goals</h1>
                    <p>
                        StriveSync offers a holistic approach to wellness,
                        empowering individuals to achieve their fitness and
                        health goals with personalized plans, comprehensive
                        tracking, and a supportive community. Experience the
                        ultimate fitness journey with precision and innovation.
                    </p>
                    <Link to='/login' className='button'>
                        Start now
                    </Link>
                </div>
                <div className='banner-right'>
                    <div className='info'>
                        <ul>
                            <li>22.37 BMI</li>
                            <li>2692.3 kcal/day</li>
                            <li>1736 BMR</li>
                        </ul>
                    </div>
                    <span>Track your fitness now</span>
                    <button>Click here</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
