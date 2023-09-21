import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryList = () => {
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

  return (
    <div>
      <h2>Select a Country</h2>
      <select>
        {countries.map((country, index) => (
          <option key={index} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>
    </div>
  );
};
export default CountryList;
