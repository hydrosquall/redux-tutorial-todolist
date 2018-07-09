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

// keep this private!
const requestTodos = filter => ({
  type: "REQUEST_TODOS",
  filter
});

// Example action that returns a function...
// Within this function, we'll call dispatch multiple times!
const fetchTodos = filter => dispatch => {
  dispatch(requestTodos(filter)); // use to help the loading indicator

  return api
    .fetchTodos(filter)
    .then(response => dispatch(receiveTodos(filter, response)));
};

export { addTodo, toggleTodo, fetchTodos };
