import React, { useState } from 'react';
import './HomePage.scss'; 
import axios from 'axios';
import { useEffect } from 'react';

const API_KEY = '6ff836cfe8dbf3f1a3198a78f64ac5a3';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';

const HomePage = () => {
  const [country, setCountry] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchData();
  }, []);
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    console.log(country)
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_URL}?q=${country}&appid=${API_KEY}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleFormSubmit} className="weather-form">
        <label>
        
          {/* <input type="text" value={country} onChange={handleCountryChange} />
           */}
           <h2>Select a Country</h2>
           <select value={country} onChange={handleCountryChange}>
        {countries.map((country, index) => (
          <option key={index} value={country.name.common} onChange={handleCountryChange}>
            {country.name.common}
          </option>
        ))}
      </select>
        </label>
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div className="weather-info">
          <h2 className="location">
            Current Weather in {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Weather Description: {weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
