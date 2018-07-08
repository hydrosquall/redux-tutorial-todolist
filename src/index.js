import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import throttle from "lodash/throttle";

import { TodoApp } from "./app";
import { store } from "./store";
import { saveState } from "./localStorage";

import "./styles.css";

const rootElement = document.getElementById("root");

store.subscribe(
  throttle(() => {
    console.log("saving");
    saveState({
      todos: store.getState().todos
    });
  }, 1000) // throttle saving to avoid excessive serialization
);

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  rootElement
);
