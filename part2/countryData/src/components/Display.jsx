const Display = ({ countries }) => {
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
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
      </div>
    );
  } else {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>{country.name.common}</li>
        ))}
      </ul>
    );
  }
};

export default Display;
