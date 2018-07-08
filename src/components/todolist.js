import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { toggleTodo } from "../actions";

import { getVisibleTodos } from "../reducers";
import { fetchTodos } from "../api";

class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos => {
      console.log(todos);
      console.log(this.props.filter, todos);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos => {
        console.log(todos);
        console.log(this.props.filter, todos);
      });
    }
  }

  render() {
    return <TodoList {...this.props} />;
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
  connect(mapStateToProps, { onTodoClick: toggleTodo })(VisibleTodoList)
);

export { VisibleTodoList };
