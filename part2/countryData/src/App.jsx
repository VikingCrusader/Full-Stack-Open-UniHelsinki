import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Find from './components/Find.jsx'
import Display from './components/Display.jsx'
import dataservice from './service/dataservice.js'


const App = () => {
  const [countries, setCountries] = useState([]);

  // Fetch all countries data when the component mounts
  useEffect(() => {
    dataservice.getAll()
      .then(data => {
        setCountries(data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Find filter={filter} handleFilterChange={handleFilterChange} />
      <Display countries={filteredCountries} />
    </div>
  );
}

export default App;
