import { useState } from "react";
import { useEffect } from "react";
import ShowWeather from "./ShowWeather.jsx";

const Display = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
    
  useEffect(() => {
    // Reset selected country if the countries prop changes
    setSelectedCountry(null);
  }, [countries]);

  const handleShowCountry = (countryName) => {
    const country = countries.find((c) => c.name.common === countryName);
    setSelectedCountry(country);
    console.log("Selected country:", country);
  };

  if (!Array.isArray(countries) || countries.length === 0) {
    return <p>No countries to display.</p>;
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  } else if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          width="200"
        />
        <ShowWeather capital={country.capital} />
      </div>
    );
  } else if (selectedCountry !== null) {
    return (
      <div>
        <h2>{selectedCountry.name.common}</h2>
        <p>Capital: {selectedCountry.capital}</p>
        <p>Population: {selectedCountry.population}</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(selectedCountry.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={selectedCountry.flags.png}
          alt={`Flag of ${selectedCountry.name.common}`}
          width="200"
        />
        <ShowWeather capital={selectedCountry.capital} />
      </div>
    );
  } else {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => handleShowCountry(country.name.common)}>
              Show
            </button>
          </div>
        ))}
      </div>
    );
  }
};

export default Display;
