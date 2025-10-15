import React from "react";

const TodoItem = ({ todo, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(todo);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      onDelete(todo.id);
    }
  };

  return (
    <div className={`todo-item ${todo.is_done ? "completed" : ""}`}>
      <div className="todo-header">
        <div className="todo-title">{todo.title}</div>
        <div className="todo-actions">
          <button
            className="btn btn-info btn-sm"
            onClick={handleEdit}
            title="Edit todo"
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
            title="Delete todo"
          >
            Delete
          </button>
        </div>
      </div>

      {todo.description && (
        <div className="todo-description">{todo.description}</div>
      )}

      <div className="todo-meta">
        <span
          className={`todo-status ${todo.is_done ? "completed" : "pending"}`}
        >
          {todo.is_done ? "Completed" : "Pending"}
        </span>
        <span>Created: {new Date(todo.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default TodoItem;
