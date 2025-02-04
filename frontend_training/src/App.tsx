import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

type TodoItem = {
  id: string;
  text: string;
  isCompleted: boolean;
  isEdit: boolean;
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

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
              {
                id: uuidv4(),
                text: inputValue,
                isCompleted: false,
                isEdit: false,
              },
            ]);
            setInputValue("");
          }}
        >
          追加
        </button>
      </div>
      <ul className="todoList">
        {filteredTodoList.map((todo) => {
          if (todo.isEdit) {
            return <EditTodo todo={todo} setTodoList={setTodoList} />;
          }

          return (
            <div className="todoItem">
              <li
                key={todo.text}
                onClick={() => {
                  setTodoList((prev) => {
                    return prev.map((item) => {
                      if (item.id === todo.id) {
                        return { ...item, isEdit: true };
                      }

                      return item;
                    });
                  });
                }}
              >
                {todo.text}
              </li>
              <button
                className="completeButton"
                type="button"
                onClick={() => {
                  setTodoList((prev) => {
                    return prev.map((item) => {
                      if (item.id === todo.id) {
                        return { ...item, isCompleted: true };
                      }
                      return item;
                    });
                  });
                }}
              >
                完了
              </button>
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default App;

function EditTodo({
  todo,
  setTodoList,
}: {
  todo: TodoItem;
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}) {
  const [inputValue, setInputValue] = useState(todo.text);

  return (
    <div className="editItem">
      <input
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        className="input"
      />
      <div className="actionButtons">
        <button className="updateButton" type="button" onClick={() => {
          setTodoList((prev) => {
            return prev.map((item) => {
              if (item.id === todo.id) {
                return { ...item, text: inputValue, isEdit: false };
              }

              return item;
            });
          });
        }}>
          更新
        </button>
        <button
          className="cancelButton"
          type="button"
          onClick={() => {
            setTodoList((prev) => {
              return prev.map((item) => {
                if (item.id === todo.id) {
                  return { ...item, isEdit: false };
                }

                return item;
              });
            });
          }}
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}
