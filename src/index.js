import React from "react";
import { render } from "react-dom";

import Root from "./components/root";
import configureStore from "./configureStore";
import { fetchTodos } from "./api";

import "./styles.css";

const rootElement = document.getElementById("root");

const store = configureStore();

fetchTodos("all").then(todos => console.log(todos));

render(<Root store={store} />, rootElement);
