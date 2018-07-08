import React from "react";
import { render } from "react-dom";

import Root from "./components/root";
import configureStore from "./configureStore";

import "./styles.css";

const rootElement = document.getElementById("root");

const store = configureStore();

render(<Root store={store} />, rootElement);
