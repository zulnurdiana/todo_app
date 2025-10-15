import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTodos } from "../../contexts/TodoContext";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import Pagination from "./Pagination";

const TodoPage = () => {
  const { user, logout } = useAuth();
  const {
    todos,
    pagination,
    loading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    setFilter,
    setPage,
    clearError,
  } = useTodos();

  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleAddTodo = () => {
    setEditingTodo(null);
    setShowForm(true);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  const handleSubmitTodo = async (todoData) => {
    setFormLoading(true);

    try {
      let result;
      if (editingTodo) {
        result = await updateTodo(editingTodo.id, todoData);
      } else {
        result = await createTodo(todoData);
      }

      if (result.success) {
        setShowForm(false);
        setEditingTodo(null);
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    await deleteTodo(todoId);
  };

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setFilter(filter);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div className="container">
      <header className="card">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1>📝 Todo App</h1>
            <p className="text-muted mb-0">
              Welcome, <strong>{user?.username}</strong>!
            </p>
          </div>
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main className="card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>My Todos</h2>
          <button
            className="btn btn-success"
            onClick={handleAddTodo}
            disabled={loading}
          >
            + Add Todo
          </button>
        </div>

        <div className="filters mb-4">
          <select
            onChange={handleFilterChange}
            disabled={loading}
            defaultValue=""
          >
            <option value="">All Todos</option>
            <option value="false">Pending</option>
            <option value="true">Completed</option>
          </select>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
            <button
              type="button"
              className="btn btn-sm btn-outline-danger ms-2"
              onClick={clearError}
            >
              ×
            </button>
          </div>
        )}

        <TodoList
          todos={todos}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          loading={loading}
        />

        <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </main>

      {showForm && (
        <TodoForm
          todo={editingTodo}
          onSubmit={handleSubmitTodo}
          onCancel={handleCloseForm}
          loading={formLoading}
        />
      )}
    </div>
  );
};

export default TodoPage;
