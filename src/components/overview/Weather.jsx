import React, { useState, useEffect } from 'react';

// Images for different weather conditions
const weatherImages = {
    clearsky: 'path/to/sunny-image.png', // Replace with actual path
    'few clouds': 'path/to/few-clouds-image.png', // Replace with actual path
    'scattered clouds': 'path/to/scattered-clouds-image.png', // Replace with actual path
    'broken clouds': 'path/to/broken-clouds-image.png', // Replace with actual path
    'shower rain': 'path/to/shower-rain-image.png', // Replace with actual path
    rain: 'path/to/rainy-image.png', // Replace with actual path
    thunderstorm: 'path/to/thunderstorm-image.png', // Replace with actual path
    snow: 'path/to/snow-image.png', // Replace with actual path
    mist: 'path/to/mist-image.png', // Replace with actual path
};

const Weather = () => {
    const [city, setCity] = useState('Kathmandu');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [isChangingCity, setIsChangingCity] = useState(false);
    const apiKey = '9d79af073fb70ad2078f66222ece32e5';

    useEffect(() => {
        fetchWeatherData();
    }, [city]);

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
                throw new Error('City not found');
            }

            const data = await response.json();
            setWeatherData(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        }
    };

    const handleSearch = () => {
        fetchWeatherData();
    };

    const handleChangeCity = () => {
        setIsChangingCity(true);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleCitySubmit = (e) => {
        if (e.key === 'Enter') {
            fetchWeatherData();
        }
    };

    const handleCitySubmitButton = () => {
        setIsChangingCity(false);
    };

    const handleCancelChange = () => {};

    const getWeatherStyle = (weather) => {
        switch (weather) {
            case 'clear sky':
                return {
                    backgroundColor: '#FFEB3B',
                    color: '#000',
                    image: weatherImages.clearsky,
                };
            case 'few clouds':
                return {
                    backgroundColor: '#D3D3D3',
                    color: '#000',
                    image: weatherImages['few clouds'],
                };
            case 'scattered clouds':
                return {
                    backgroundColor: '#B0BEC5',
                    color: '#000',
                    image: weatherImages['scattered clouds'],
                };
            case 'broken clouds':
                return {
                    backgroundColor: '#9E9E9E',
                    color: '#000',
                    image: weatherImages['broken clouds'],
                };
            case 'shower rain':
                return {
                    backgroundColor: '#2196F3',
                    color: '#FFF',
                    image: weatherImages['shower rain'],
                };
            case 'rain':
                return {
                    backgroundColor: '#64B5F6',
                    color: '#FFF',
                    image: weatherImages.rain,
                };
            case 'thunderstorm':
                return {
                    backgroundColor: '#607D8B',
                    color: '#FFF',
                    image: weatherImages.thunderstorm,
                };
            case 'snow':
                return {
                    backgroundColor: '#B3E5FC',
                    color: '#000',
                    image: weatherImages.snow,
                };
            case 'mist':
                return {
                    backgroundColor: '#CFD8DC',
                    color: '#000',
                    image: weatherImages.mist,
                };
            default:
                return { backgroundColor: '#B0BEC5', color: '#000', image: '' };
        }
    };

    const weatherStyle = weatherData
        ? getWeatherStyle(weatherData.weather[0].description)
        : {};

    return (
        <div className='weather-container'>
            {isChangingCity ? (
                <div className='city-change-box'>
                    <input
                        type='text'
                        value={city}
                        onChange={handleCityChange}
                        onKeyDown={handleCitySubmit}
                        placeholder='Enter city name'
                        className='city-input'
                    />
                    <button
                        onClick={handleCitySubmitButton}
                        className='submit-button'
                    >
                        Submit
                    </button>
                    <button
                        onClick={handleCancelChange}
                        className='cancel-button'
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div
                    className='weather-info-box'
                    style={{
                        backgroundColor: weatherStyle.backgroundColor,
                        padding: '50px',
                        borderRadius: '10px',
                    }}
                >
                    <button
                        onClick={handleChangeCity}
                        className='change-city-button'
                        style={{
                            whiteSpace: 'nowrap',
                            backgroundColor: 'white',
                            borderRadius: '3px',
                            border: 'none',
                            padding: '5px',
                            position: 'absolute',
                            top: '10px',
                            right: '5px',
                        }}
                    >
                        Change City
                    </button>
                    {weatherData && (
                        <div
                            className='weather-info'
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <p
                                className='temperature'
                                style={{
                                    whiteSpace: 'nowrap',
                                    fontSize: '1.2rem',
                                }}
                            >
                                {weatherData.main.temp} °C
                            </p>
                            <p
                                className='weather-description'
                                style={{
                                    whiteSpace: 'nowrap',
                                    marginTop: '5px',
                                }}
                            >
                                {weatherData.weather[0].description}
                            </p>
                        </div>
                    )}
                    {error && <p className='error'>{error}</p>}
                </div>
            )}
        </div>
    );
};

export default Weather;
