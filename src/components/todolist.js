import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import * as actions from "../actions";

import { getVisibleTodos, getIsFetching } from "../reducers";

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
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter); // figure out how to avoid duplicating this 'all' default knowledge...
  }

  render() {
    const { toggleTodo, todos, isFetching } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }

    return <TodoList todos={todos} onTodoClick={toggleTodo} />;
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
  const filter = params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  };
};
VisibleTodoList = withRouter(
  // Possible to use shorthand since arguments match action arguments exactly
  connect(mapStateToProps, actions)(VisibleTodoList)
);

export { VisibleTodoList };
