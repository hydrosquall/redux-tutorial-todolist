// Mock backend for async data
import { v4 } from "node-uuid";

const fakeDatabase = {
  todos: [
    {
      id: v4(),
      text: "hey",
      completed: true
    },
    {
      id: v4(),
      text: "ho",
      completed: true
    },
    {
      id: v4(),
      text: "let’s go",
      completed: false
    }
  ]
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = filter =>
  delay(500).then(() => {
    if (Math.random() < 0.1) {
      // simulate bad server
      throw new Error("boom!");
    }

    const todos = fakeDatabase.todos;
    switch (filter) {
      case "all":
        return todos;
      case "completed":
        return todos.filter(t => t.completed);
      case "active":
        return todos.filter(t => !t.completed);
      default:
        console.log("backend filter not recognized");
        return todos;
    }
  });

// Simulate adding/toggling todos
export const addTodo = text =>
  delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false
    };

    fakeDatabase.todos.push(todo);
    return todo;
  });

export const toggleTodo = id =>
  delay(500).then(() => {
    const todo = fakeDatabase.todos.find(t => t.id === id);
    todo.completed = !todo.completed; // toggle
    return todo;
  });
