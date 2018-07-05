import React from "react";
import { connect } from "react-redux";

import { VisibleTodoList } from "./components/todolist";
import { Footer } from "./components/footer";

import { addTodo } from "./actions";

let AddTodo = ({ dispatch }) => {
  let input;

  const onAddClick = text => {
    dispatch(addTodo(text));
  };
  return (
    <div>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          onAddClick(input.value);
          input.value = "";
        }}
      >
        Add Todo!
      </button>
    </div>
  );
};

AddTodo = connect()(AddTodo);

const TodoApp = ({ store }) => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer store={store} />
  </div>
);

export { TodoApp };
