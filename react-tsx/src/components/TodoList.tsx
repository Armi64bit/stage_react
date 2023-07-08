import React, { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa6";
import { AiFillEdit } from "react-icons/ai";

interface Todo {
  id: number;
  text: string;
  complete: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("my_todos");
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  //event hadnlers
  const createNewTodo = () => {
    const item: Todo = {
      id: new Date().getTime(),
      text: "",
      complete: false
    };

    setTodos([item, ...todos]);
  };

  const handleCheckboxChange = (item: Todo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === item.id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodos(updatedTodos);
    save(updatedTodos);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, item: Todo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === item.id ? { ...todo, text: e.target.value } : todo
    );
    setTodos(updatedTodos);
  };

  // const handleInputBlur = (item: Todo) => {
  //   const updatedTodos = todos.map((todo) =>
  //     todo.id === item.id ? { ...todo, complete: false } : todo
  //   );
  //   setTodos(updatedTodos);
  //   save(updatedTodos);
  // };

  const handleEditButtonClick = (item: Todo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === item.id ? { ...todo, complete: false } : todo
    );
    setTodos(updatedTodos);
  };

  const handleRemoveButtonClick = (item: Todo) => {
    const updatedTodos = todos.filter((todo) => todo.id !== item.id);
    setTodos(updatedTodos);
    save(updatedTodos);
  };

  const save = (updatedTodos: Todo[]) => {
    localStorage.setItem("my_todos", JSON.stringify(updatedTodos));
  };

  const renderTodoElement = (item: Todo) => {
    const checkbox = (
      <input
        type="checkbox"
        checked={item.complete}
        onChange={() => handleCheckboxChange(item)}
      />
    );

    const inputEl = (
      <input
        type="text"
        value={item.text}
        disabled={item.complete}
        onChange={(e) => handleInputChange(e, item)}
        // onBlur={() => handleInputBlur(item)}
      />
    );

    const editBtnEl = (
      <button className="material-icons" onClick={() => handleEditButtonClick(item)}>
        <AiFillEdit/> Edit
      </button>
    );

    const removeBtnEl = (
      <button className="material-icons remove-btn" onClick={() => handleRemoveButtonClick(item)}>
       <FaTrash/>  
      </button>
    );

    return (
      <div className={`item ${item.complete ? "complete" : ""}`} key={item.id}>
        {checkbox}
        {inputEl}
        <div className="actions">
          {editBtnEl}
          {removeBtnEl}
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      <header>
        <h1>Your Todos</h1>
        <button id="create" onClick={createNewTodo}>
          Add new todo
        </button>
      </header>

      <div className="todo-list" id="list">
        {todos.map((item) => renderTodoElement(item))}
      </div>
    </div>
  );
};

export default TodoList;
