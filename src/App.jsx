import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Features from './pages/Features';
import Services from './pages/Services';
import Blog from './pages/Blog';
import About from './pages/About';
import NavBar from './components/navbar/NavBar';
import Login from './pages/Login';
import FitnessCalc from './pages/FitnessCalc';
// Login and profile
import LoginPage from './components/loginPage/LoginPage';
import ProfilePage from './components/loginPage/ProfilePage';

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/features' element={<Features />}></Route>
                <Route path='/services' element={<Services />}></Route>
                <Route path='/blogs' element={<Blog />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route
                    path='/fitness-calculator'
                    element={<FitnessCalc />}
                ></Route>
                {/* login */}
                <Route path='/login' element={<LoginPage />}></Route>
                {/* Profile */}
                <Route path='profile' element={<ProfilePage />}></Route>
            </Routes>
        </>
    );
}

export default App;
