import React, { createContext, useContext, useReducer, useEffect } from "react";
import { todoAPI } from "../services/api";

const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload.todos,
        pagination: action.payload.pagination,
        loading: false,
        error: null,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
        currentPage: 1,
      };
    case "SET_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  todos: [],
  pagination: {
    current_page: 1,
    total_pages: 1,
    total_items: 0,
    items_per_page: 10,
  },
  currentPage: 1,
  filter: "",
  loading: false,
  error: null,
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const loadTodos = async (page = state.currentPage, filter = state.filter) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const params = {
        page,
        limit: 10,
        ...(filter && { is_done: filter }),
      };

      const response = await todoAPI.getAll(params);
      dispatch({
        type: "SET_TODOS",
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.message || "Failed to load todos",
      });
    }
  };

  const createTodo = async (todoData) => {
    try {
      const response = await todoAPI.create(todoData);
      dispatch({ type: "ADD_TODO", payload: response.data.todo });
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to create todo";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const updateTodo = async (id, todoData) => {
    try {
      const response = await todoAPI.update(id, todoData);
      dispatch({ type: "UPDATE_TODO", payload: response.data.todo });
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update todo";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoAPI.delete(id);
      dispatch({ type: "DELETE_TODO", payload: id });
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete todo";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const setFilter = (filter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
    loadTodos(1, filter);
  };

  const setPage = (page) => {
    dispatch({ type: "SET_PAGE", payload: page });
    loadTodos(page, state.filter);
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  useEffect(() => {
    loadTodos(state.currentPage, state.filter);
  }, [state.currentPage, state.filter]);

  const value = {
    ...state,
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    setFilter,
    setPage,
    clearError,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
