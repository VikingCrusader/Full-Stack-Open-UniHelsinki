import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import server from "./services/server";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  //Read
  useEffect(() => {
    server
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error("Error fetching persons:", error);
      });
  }, []);

  //Create and Update
  const addName = (event) => {
    //client side validation
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson) {
      if (!window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
        return;
      }
      const updatedPerson = { ...existingPerson, number: newNumber };
      server
        .update(existingPerson.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : returnedPerson
            )
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error updating person:", error);
        });
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      server
        .create(newPerson)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error creating person:", error);
        });
    }
  };

  //Delete
  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (personToDelete) {
      if (window.confirm(`Are you sure you want to delete ${personToDelete.name}?`)) {
        server
          .del(id)
          .then(() => {
            setPersons(persons.filter((person) => person.id !== id));
          })
          .catch((error) => {
            console.error("Error deleting person:", error);
          });
      }
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
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <PersonForm
        addName={addName}
        newName={newName}
        handleInputChange={handleInputChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
