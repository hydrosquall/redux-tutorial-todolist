// Redux action creators
import { v4 } from "node-uuid";

// Add Todos
let nextTodoId = 0;
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

// Footer
const setVisibilityFilter = filter => ({
  type: "SET_VISIBILITY_FILTER",
  filter: filter
});

export { addTodo, setVisibilityFilter, toggleTodo };
