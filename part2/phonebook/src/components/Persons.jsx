const Persons = ({ filteredPersons, deletePerson, updateNumber, updateName }) => {
  return (
    <div>
      {filteredPersons.map((item) => (
        <p key={item.id}>
          {item.name}: {item.number}
          <button onClick={() => deletePerson(item.id)}>delete</button>
        </p>
      )
      )}
    </div>
  );
};
export default Persons;
