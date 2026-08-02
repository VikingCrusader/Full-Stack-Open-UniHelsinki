const Note = ({ note, toggleImportance, deleteNote }) => {
  const label1 = note.important ? "make it not important" : "make it important";
  const label2 = "delete";
  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label1}</button>
      <button onClick={deleteNote}>{label2}</button>
    </li>
  );
};

export default Note;
