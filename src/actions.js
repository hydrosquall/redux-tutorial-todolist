// Redux action creators
import { getIsFetching } from "./reducers";
import * as api from "./api";

// Add Todos
const addTodo = text => dispatch =>
  api.addTodo(text).then(response => {
    dispatch({
      type: "ADD_TODO_SUCCESS",
      response
    });
  });

// Todolist
const toggleTodo = id => ({
  type: "TOGGLE_TODO",
  id
});

// API
// keep this private!
// Note... we could literally embed these directly in fetchTodos since they're never used elsewhere.
// const receiveTodos = (filter, response) => ({
//   type: "RECEIVE_TODOS",
//   filter,
//   response
// });

// // keep this private!
// const requestTodos = filter => ({
//   type: "REQUEST_TODOS",
//   filter
// });

// Example action that returns a function...
// Within this function, we'll call dispatch multiple times!
const fetchTodos = filter => (dispatch, getState) => {
  // guard against race conditions where requests is already out, limits max # of requests out.
  // test by making the delay 5+ seconds
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: "FETCH_TODOS_REQUEST",
    filter
  }); // use to help the loading indicator

  return api.fetchTodos(filter).then(
    response =>
      dispatch({
        type: "FETCH_TODOS_SUCCESS",
        filter,
        response
      }),
    // Preferable to making a "catch" block b/c it ensures we don't catch the wrong message.
    error =>
      dispatch({
        type: "FETCH_TODOS_FAILURE",
        filter,
        message: error.message || "Something went wrong!"
      })
  );
};

export { addTodo, toggleTodo, fetchTodos };
