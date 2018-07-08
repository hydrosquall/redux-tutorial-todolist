import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { TodoApp } from "./app";
import { store } from "./store";
import { loadState, saveState } from "./localStorage";

import "./styles.css";

const rootElement = document.getElementById("root");
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <TodoApp />
    </Provider>,
    rootElement
  );
};

// NEED TO SUBSCRIBE RENDER TO RUN EVERY TIME STATE CHANGES!!
store.subscribe(render);

store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  });
});

render();
