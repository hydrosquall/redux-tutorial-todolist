import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as actions from "../actions";

import { getVisibleTodos } from "../reducers";
import { fetchTodos } from "../api";

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, receiveTodos } = this.props;
    fetchTodos(filter).then(todos => {
      receiveTodos(filter, todos); // merge API todos with local todos
    });
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return <TodoList {...rest} onTodoClick={toggleTodo} />;
  }
}

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
  const filter = params.filter;
  return {
    todos: getVisibleTodos(state, filter || "all"),
    filter
  };
};
VisibleTodoList = withRouter(
  // Possible to use shorthand since arguments match action arguments exactly
  connect(mapStateToProps, actions)(VisibleTodoList)
);

export { VisibleTodoList };
