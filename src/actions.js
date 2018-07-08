// Redux action creators
import { v4 } from "node-uuid";

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

export { addTodo, toggleTodo };
