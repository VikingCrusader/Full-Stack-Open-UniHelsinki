import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = (props) => {
  const [notes, setNotes] = useState([]); //这个useState控制了notes的状态，初始值为props.notes
  const [newNote, setNewNote] = useState("a new note..."); //这个useState控制了newNote的状态，初始值为'a new note...'
  const [showAll, setShowAll] = useState(true);

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value); //每次输入框的值发生变化时，都会触发这个函数，将输入框的值更新到newNote的状态中
  };

  const notesToShow = showAll //在这里我们用了一个三元运算符来判断是否显示所有的笔记，如果showAll为true，则显示所有的笔记，否则只显示重要的笔记
    ? notes //如果showAll为true，则notesToShow就是notes数组本身
    : notes.filter((note) => note.important === true); //如果showAll为false，则notesToShow是一个新的数组，里面只包含important为true的笔记

  // Create
  const addNote = (event) => {
    event.preventDefault(); //阻止表单的默认提交行为
    const noteObject = {
      content: newNote, //content是newNote的值
      important: Math.random() < 0.5, //有0.5的概率这一条笔记是重要的
      id: String(notes.length + 1), //id是一个字符串，值为notes数组的长度加1
    };

    noteService
      .create(noteObject) //使用noteService发送一个POST请求，将noteObject发送到服务器
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote)); //将服务器返回的笔记对象添加到notes数组中，并更新notes的状态
        setNewNote(""); //将newNote的状态重置为空字符串
      })
      .catch((error) => {
        console.error("Error creating note:", error); //如果请求失败，打印错误信息
      });
  };

  //Read
  useEffect(() => {
    noteService
      .getAll()
      .then(returnedNote => {
        setNotes(returnedNote
        ); //将服务器返回的笔记数组设置为notes的状态
      })
      .catch(error => {
        console.error("Error fetching notes:", error); //如果请求失败，打印错误信息
      });
  }, []); //这个空数组表示这个effect只会在组件挂载时执行一次
  console.log("render", notes.length, "notes");

  //Update
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id); //在notes数组中找到要修改的笔记
    const changedNote = { ...note, important: !note.important }; //创建一个新的对象，复制原来的笔记对象，并将important属性取反

    noteService
      .update(id, changedNote) //使用noteService发送一个PUT请求，将changedNote发送到服务器，更新笔记的内容
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote))); //将notes数组中对应id的笔记替换为服务器返回的笔记对象，并更新notes的状态
      })
      .catch((error) => {
        console.error("Error updating note:", error); //如果请求失败，打印错误信息
      });
  };

  //Delete
  const deleteNote = (id) => {
    const note = notes.find((n) => n.id === id); //在notes数组中找到要删除的笔记
    console.log("Deleting note:", note); //打印要删除的笔记对象

    noteService
      .delete(id) //使用noteService发送一个DELETE请求，将id发送到服务器，删除对应的笔记
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id)); //将notes数组中对应id的笔记删除，并更新notes的状态
      })
      .catch((error) => {
        console.error("Error deleting note:", error); //如果请求失败，打印错误信息
      });
  };

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
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={() => deleteNote(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};;

export default App;
