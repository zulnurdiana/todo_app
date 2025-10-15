import React, { useState, useEffect } from "react";

const TodoForm = ({ todo, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_done: false,
  });
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || "",
        description: todo.description || "",
        is_done: todo.is_done || false,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        is_done: false,
      });
    }
    setValidationErrors({});
  }, [todo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    } else if (formData.title.length > 200) {
      errors.title = "Title must not exceed 200 characters";
    }

    if (formData.description && formData.description.length > 1000) {
      errors.description = "Description must not exceed 1000 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{todo ? "Edit Todo" : "Add Todo"}</h2>
          <button
            type="button"
            className="close"
            onClick={onCancel}
            disabled={loading}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-control ${
                validationErrors.title ? "is-invalid" : ""
              }`}
              placeholder="Enter todo title"
              disabled={loading}
              maxLength={200}
            />
            {validationErrors.title && (
              <div className="invalid-feedback">{validationErrors.title}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`form-control ${
                validationErrors.description ? "is-invalid" : ""
              }`}
              placeholder="Enter todo description (optional)"
              rows={4}
              disabled={loading}
              maxLength={1000}
            />
            {validationErrors.description && (
              <div className="invalid-feedback">
                {validationErrors.description}
              </div>
            )}
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="is_done"
              name="is_done"
              checked={formData.is_done}
              onChange={handleChange}
              disabled={loading}
            />
            <label htmlFor="is_done">Mark as completed</label>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : todo ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
