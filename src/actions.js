// Redux action creators
import { v4 } from "node-uuid";

import * as api from "./api";

// Add Todos
const addTodo = text => ({
  type: "ADD_TODO",
  id: v4(), // unique identifier
  text
});

// Todolist
const toggleTodo = id => ({
  type: "TOGGLE_TODO",
  id
});

// API
// keep this private!
const receiveTodos = (filter, response) => ({
  type: "RECEIVE_TODOS",
  filter,
  response
});

// Example action that returns a PROMISE
const fetchTodos = filter =>
  api.fetchTodos(filter).then(response => receiveTodos(filter, response));

export { addTodo, toggleTodo, fetchTodos };
