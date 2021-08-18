import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function Todo({ todos, completedTodo, removeTodo, editTodo }) {
  return todos.map((todo) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={todo.id}
    >
      <div onClick={() => completedTodo(todo.id)}>{todo.text}</div>
      <div className="icons">
        <RiCloseCircleLine
          className="delete-icon"
          onClick={() => removeTodo(todo.id)}
        />
        <TiEdit className="edit-icon" onClick={() => editTodo(todo.id)} />
      </div>
    </div>
  ));
}

export default Todo;
