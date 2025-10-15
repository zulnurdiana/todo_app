import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner"></div>
        <p>Loading todos...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center text-muted" style={{ padding: "40px" }}>
        <h3>No todos found</h3>
        <p>Create your first todo to get started!</p>
      </div>
    );
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
