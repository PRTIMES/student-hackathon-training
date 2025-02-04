import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

type TodoItem = {
  id: string;
  text: string;
  isCompleted: boolean;
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted)

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
            if (inputValue === "") return;

            setTodoList((prev) => [
              ...prev,
              { id: uuidv4(), text: inputValue, isCompleted: false },
            ]);
            setInputValue("");
          }}
        >
          追加
        </button>
      </div>
      <ul className="todoList">
        {filteredTodoList.map((todo) => {
          return (
            <div className="todoItem">
              <li key={todo.text}>{todo.text}</li>
              <button className="completeButton" type="button" onClick={() => {
                setTodoList((prev) => {
                  return prev.map((item) => {
                    if (item.id === todo.id) {
                      return { ...item, isCompleted: true};
                    }
                    return item;
                  });
                }) 
              }}>完了</button>
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default App;
