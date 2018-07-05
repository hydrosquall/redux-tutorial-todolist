// Redux action creators

// Add Todos
let nextTodoId = 0;
const addTodo = text => ({
  type: "ADD_TODO",
  id: nextTodoId++,
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
