import { useState } from "react";
import "./App.css";

type TodoItem = {
  text: string;
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  return (
    <>
      <h1>TODOアプリ</h1>
      <div className="inputForm">
        <input
          className="input"
          type="text"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button
          className="addButton"
          type="button"
          onClick={() => {
            if (inputValue === "") return

            setTodoList((prev) => [...prev, { text: inputValue }]);
            setInputValue("");
          }}
        >
          追加
        </button>
      </div>
      <ul>
        {todoList.map((todo) => {
          return <li key={todo.text}>{todo.text}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
