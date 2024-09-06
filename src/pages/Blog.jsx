import React from 'react';
import blogBanner from '../../src/assets/images/blog-banner.jpg';
import below1 from '../../src/assets/images/banner-below-1.jpg';
import below2 from '../../src/assets/images/banner-below-2.jpg';
import blogFirst from '../../src/assets/images/blog-first.jpg';
import blogSecond from '../../src/assets/images/blog-second.jpg';
import blogThird from '../../src/assets/images/blog-third.jpg';
import blogFour from '../../src/assets/images/blog-fourth.jpg';
import blogFive from '../../src/assets/images/blog-fifth.jpg';
import food1 from '../../src/assets/images/food-one.jpg';
import food2 from '../../src/assets/images/food-two.jpg';
import food3 from '../../src/assets/images/food-three.jpg';
import gym1 from '../../src/assets/images/gym-first.jpg';
import gym2 from '../../src/assets/images/gym-second.jpg';
import gym3 from '../../src/assets/images/gym-third.jpg';

const Blog = () => {
    return (
        <div className='blog'>
            <div
                className='blog-banner-img'
                style={{
                    backgroundImage: `
                        linear-gradient(to bottom, white, rgba(255, 192, 203, 0) 80px),
                        url(${blogBanner}),
                        linear-gradient(to top, white, rgba(255, 192, 203, 0) 80px)
                    `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100vh', // Full viewport height
                }}
            >
                <div className='container banner-content'>
                    <span>Feature Story</span>
                    <p>
                        12 EXERCISE FOR <br /> SHREDED BODY
                    </p>
                </div>
            </div>
            <div className='rectangle'>
                <div className='container'>
                    <div className='below-banner'>
                        <div className='row'>
                            <div className='col'>
                                <span className='trending-txt'>
                                    Trending Stories
                                </span>
                                <img src={below1} alt='' />
                                <div>
                                    <p>
                                        The Ultimate <br /> At Home <br /> Full
                                        Body Worlout
                                    </p>
                                    <span>Nov 2019 - By Krishnna Devkota</span>
                                </div>
                            </div>
                            <div className='col'>
                                <img src={below2} alt='' />
                                <div>
                                    <p>
                                        The Best Keto <br /> Diet Recepie <br />{' '}
                                        For Beginner
                                    </p>
                                    <span>Nov 2019 - By Krishnna Devkota</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container blog-start'>
                <p className='latest-span'>The latest</p>
                <div className='row'>
                    <div className='col'>
                        <img src={blogFirst} alt='' />
                    </div>
                    <div className='col'>
                        <div className='row'>
                            <img src={blogSecond} alt='' />
                            <div>
                                <p>
                                    Squats: Build strength, improve form, and
                                    feel the burn. Strength starts here!
                                </p>
                                <span>-Syenesez Gomblez</span>
                            </div>
                        </div>
                        <div className='row'>
                            <div>
                                <p>
                                    Tone abs and biceps: Sculpt, strengthen, and
                                    achieve your fitness goals.{' '}
                                </p>
                                <span>Joi Ryen-</span>
                            </div>
                            <img src={blogThird} alt='' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='blog-second'>
                    <div className='row'>
                        <div className='col'>
                            <img src={blogFour} alt='' />
                            <p>
                                Tone All Over With <br /> A Kick Ass Abs Work
                                Out
                            </p>
                            <span>-xing Fing</span>
                        </div>
                        <div className='col col2'>
                            <img src={blogFive} alt='' />
                            <p>
                                Best Exersise For Perfect <br /> Summer Body
                            </p>
                            <span>-krish deeves</span>
                        </div>
                    </div>
                </div>
                <p className='p-blog-third'>Some healthy diet option</p>
                <div className='blog-third'>
                    <div className='col'>
                        <img src={food1} alt='' />
                        <span>low carb diet</span>
                    </div>
                    <div className='col'>
                        <img src={food2} alt='' />
                        <span>high protiene diet</span>
                    </div>
                    <div className='col'>
                        <img src={food3} alt='' />
                        <span>balanced diet</span>
                    </div>
                </div>
            </div>
            <p className='p-blog-fourth'>Everyday Home Workout Idea</p>
            <div className='blog-fourth'>
                <div className='container'>
                    <div className='col'>
                        <img src={gym1} alt='' />
                        <span>10 mins no jumping workout</span>
                    </div>
                    <div className='col'>
                        <img src={gym2} alt='' />
                        <span>Hour Glass Body Workout</span>
                    </div>
                    <div className='col'>
                        <img src={gym3} alt='' />
                        <span>Everyday Warmups</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
