import React, { useRef, useEffect } from "react";

function TodoForm({ addTodo, input, isEditing, setInput }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addTodo({
      id: new Date().getTime().toString(),
      text: input,
      isComplete: false,
    });

    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="add a todo"
        value={input}
        name="text"
        className="todo-input"
        onChange={handleChange}
        ref={inputRef}
      />
      <button className="todo-button">
        {isEditing ? "Edit Todo" : "Add Todo"}
      </button>
    </form>
  );
}

export default TodoForm;
