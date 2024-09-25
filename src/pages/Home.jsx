import React from 'react';
import Banner from '../components/home-banner/Banner';
import deitplan from '../assets/images/diet-plan.png';
import workoutplan from '../assets/images/workout-planning.png';
import consultation from '../assets/images/consultation.png';
import below1 from '../../src/assets/images/banner-below-1.jpg';
import below2 from '../../src/assets/images/banner-below-2.jpg';

const Home = () => {
    return (
        <>
            <Banner />
            <div className='home'>
                <div className='container'>
                    <div className='after-banner'>
                        <ul className='goals'>
                            <li>
                                Weight <br /> Loss
                            </li>
                            <li>
                                Muscle <br /> Gain
                            </li>
                            <li>
                                General <br /> Fitness
                            </li>
                            <li>
                                Endurance <br /> improvement
                            </li>
                        </ul>
                        <div className='quote'>
                            <p>
                                "Connect, Inspire, Achieve – Join Our Fitness
                                Family!"
                                <br />
                                Strive for Progress, Not Perfection
                            </p>
                        </div>
                    </div>
                    <div className='programs'>
                        <h3>
                            Our <span>featured programs</span>
                        </h3>
                        <div className='images'>
                            <img src={workoutplan} alt='' />
                            <img src={consultation} alt='' />
                            <img src={deitplan} alt='' />
                        </div>
                    </div>
                    <div className='about-us'>
                        <h3>About Us</h3>
                        <p>
                            StriveSync started with a vision to simplify fitness
                            journeys by merging technology and community.
                            Recognizing the challenges of staying motivated and
                            tracking progress, the founders aimed to build an
                            app that goes beyond basic workout logging.
                            StriveSync offers personalized plans, tracks users'
                            goals, and connects them with a supportive
                            community. The platform's unique approach encourages
                            users to share achievements, challenges, and tips,
                            creating a collaborative environment. As StriveSync
                            evolved, it became a go-to resource for fitness
                            enthusiasts looking to maintain a balanced and
                            healthy lifestyle.
                        </p>
                        <p>
                            StriveSync began with a simple yet powerful idea: to
                            empower individuals on their fitness journeys
                            through a blend of technology, community, and
                            personalization. The founders noticed a gap in the
                            fitness app market—while many apps focused on
                            workouts or diets, few offered a holistic approach
                            that combined these elements with social support and
                            real-time progress tracking. StriveSync was created
                            to fill that gap. The app provides personalized
                            workout plans, nutrition advice, and mental
                            well-being support, all tailored to each user's
                            specific goals and lifestyle. What sets StriveSync
                            apart is its community-driven approach, allowing
                            users to share their progress, celebrate milestones,
                            and motivate each other. Over time, StriveSync has
                            evolved into more than just a fitness app; it's a
                            comprehensive wellness platform designed to help
                            users achieve their best selves. The platform
                            continues to innovate, integrating new features and
                            technologies that make fitness more accessible and
                            engaging for everyone.
                        </p>
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
                                                The Ultimate <br /> At Home{' '}
                                                <br /> Full Body Worlout
                                            </p>
                                            <span>
                                                Nov 2019 - By Krishnna Devkota
                                            </span>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <img src={below2} alt='' />
                                        <div>
                                            <p>
                                                The Best Keto <br /> Diet
                                                Recepie <br /> For Beginner
                                            </p>
                                            <span>
                                                Nov 2019 - By Krishnna Devkota
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
