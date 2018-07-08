import React from "react";
import { Provider } from "react-redux";

// react-router-dom has been split up: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
// Use BrowserRouter instead of vanilla Router
import { BrowserRouter, Route, browserHistory } from "react-router-dom";

import { TodoApp } from "./app";

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <Route path="/" component={TodoApp} />
    </BrowserRouter>
  </Provider>
);

export default Root;
