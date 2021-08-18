import React, { useState, useEffect } from "react";

// imported components
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    } else if (todo.text && isEditing) {
      setTodos(
        todos.map((todo) => {
          if (todo.id === editId) {
            return { ...todo, text: input };
          }
          return todo;
        })
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      const newTodos = [todo, ...todos];
      setTodos(newTodos);
    }
  };

  const completedTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    if (isEditing) {
      return;
    }
    let filteredTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(filteredTodos);
  };

  const clearTodo = () => {
    setTodos([]);
  };

  const editTodo = (id) => {
    let editTodoItem = todos.find((todo) => todo.id === id);
    setIsEditing(true);
    setEditId(id);
    setInput(editTodoItem.text);
  };

  const saveLocalTodos = (todos1) => {
    localStorage.setItem("todos", JSON.stringify(todos1));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    saveLocalTodos(todos);
  }, [todos]);

  return (
    <div className="todo-app">
      <h1>What's your Plan for Today, Buddy?</h1>
      <TodoForm
        addTodo={addTodo}
        input={input}
        setInput={setInput}
        isEditing={isEditing}
      />
      <Todo
        todos={todos}
        completedTodo={completedTodo}
        removeTodo={removeTodo}
        setInput={setInput}
        editTodo={editTodo}
      />
      {todos.length > 0 && (
        <button className="clear-btn" onClick={clearTodo}>
          Clear All
        </button>
      )}
    </div>
  );
}

export default TodoList;
