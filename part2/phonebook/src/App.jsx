import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" , id: 1, number: "040-123456" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addName = (event) => {
    event.preventDefault();
    console.log("clicked");
    const newPerson = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    };
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleInputChange = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
          <br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((item) => (
          <p key={item.id}>{item.name}: {item.number}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
