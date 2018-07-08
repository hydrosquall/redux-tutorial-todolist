import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { TodoApp } from "./app";
import configureStore from "./configureStore";

import "./styles.css";

const rootElement = document.getElementById("root");

const store = configureStore();

render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  rootElement
);
