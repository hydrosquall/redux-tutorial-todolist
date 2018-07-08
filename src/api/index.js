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
