import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { toggleTodo } from "../actions";

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "all":
      return todos;
    case "completed":
      return todos.filter(t => t.completed);
    case "active":
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
};

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}
  </li>
);
const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

const mapStateToProps = (state, { match: { params } }) => {
  return {
    todos: getVisibleTodos(state.todos, params.filter || "all")
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id));
    }
  };
};
const VisibleTodoList = withRouter(
  // have list read from router directly!
  connect(mapStateToProps, mapDispatchToProps)(TodoList)
);

export { VisibleTodoList };
