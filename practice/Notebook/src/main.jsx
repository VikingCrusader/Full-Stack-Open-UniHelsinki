import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

//这个promise是一个异步操作，返回一个Promise对象，表示异步请求的结果。
// 我们可以使用.then()方法来处理请求成功的情况，使用.catch()方法来处理请求失败的情况。
//Promise是一个对象，它代表了一个异步操作的最终完成（或失败）及其结果值。
// Promise有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。
const promise = axios.get("http://localhost:3001/notes").then((response) => {
  const notes = response.data; //这里的response.data是一个数组，里面包含了所有的笔记对象
  ReactDOM.createRoot(document.getElementById("root")).render(
    <App notes={notes} />,
  );
});


