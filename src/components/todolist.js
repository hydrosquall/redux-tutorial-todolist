import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { toggleTodo } from "../actions";

import { getVisibleTodos } from "../reducers";

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
    todos: getVisibleTodos(state, params.filter || "all")
  };
};
const VisibleTodoList = withRouter(
  // Possible to use shorthand since arguments match action arguments exactly
  connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList)
);

export { VisibleTodoList };
