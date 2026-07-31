const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map((item) => (
        <p key={item.id}>
          {item.name}: {item.number}
        </p>
      ))}
    </div>
  );
};
export default Persons;
