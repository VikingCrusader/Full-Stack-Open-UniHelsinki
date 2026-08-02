const Persons = ({ filteredPersons, deletePerson, updateNumber, updateName }) => {
  return (
    <div>
      {filteredPersons.map((item) => (
        <p key={item.id}>
          {item.name}: {item.number}
          <button onClick={() => deletePerson(item.id)}>delete</button>
          <button onClick={() => updateNumber(item.id, item.number)}>update number</button>
          <button onClick={() => updateName(item.id, item.name)}>update name</button>
        </p>
      )
      )}
    </div>
  );
};
export default Persons;
