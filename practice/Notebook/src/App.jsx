import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes); //这个useState控制了notes的状态，初始值为props.notes
  const [newNote, setNewNote] = useState('a new note...'); //这个useState控制了newNote的状态，初始值为'a new note...'
  const [showAll, setShowAll] = useState(true);
  const addNote = (event) => {
    event.preventDefault(); //阻止表单的默认提交行为
    console.log('button clicked', event.target);//这里的event.target指向的是form表单元素
    const noteObject = {
      content: newNote, //content是newNote的值
      important: Math.random() < 0.5, //有0.5的概率这一条笔记是重要的
      id: String(notes.length+1), //id是一个字符串，值为notes数组的长度加1
    }
    setNotes(notes.concat(noteObject)) //使用concat方法将新的noteObject添加到notes数组中，返回一个新的数组，并更新notes的状态
    setNewNote('') //添加完毕后，将newNote的状态重置为空字符串
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value) //每次输入框的值发生变化时，都会触发这个函数，将输入框的值更新到newNote的状态中
  }

  const notesToShow = showAll //在这里我们用了一个三元运算符来判断是否显示所有的笔记，如果showAll为true，则显示所有的笔记，否则只显示重要的笔记
    ? notes //如果showAll为true，则notesToShow就是notes数组本身
    : notes.filter(note => note.important === true) //如果showAll为false，则notesToShow是一个新的数组，里面只包含important为true的笔记

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} /> //在这里我们只渲染了notesToShow数组中的笔记，而不是所有的笔记。每个Note组件都有一个唯一的key属性，这里我们使用note.id作为key值
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
