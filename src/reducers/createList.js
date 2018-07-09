import { combineReducers } from "redux";

// Actions related to a list of todos
const createList = filter => {
  // special logic for the toggle case so that things vanish immediately after being clicked in completed
  const handleToggle = (state, action) => {
    const { result: toggledId, entities } = action.response; // normalizr reshaped
    const { completed } = entities.todos[toggledId];
    const shouldRemove = // this conditional feels suspect, an alternate design might eliminate it
      (completed && filter === "active") ||
      (!completed && filter === "completed");

    return shouldRemove ? state.filter(id => id !== toggledId) : state;
  };

  const ids = (state = [], action) => {
    // action.response.result is either a list of ids or a single id thanks to normalizr
    switch (action.type) {
      case "FETCH_TODOS_SUCCESS":
        return filter === action.filter ? action.response.result : state;
      case "ADD_TODO_SUCCESS":
        return filter !== "completed"
          ? [...state, action.response.result]
          : state;
      case "TOGGLE_TODO_SUCCESS":
        return handleToggle(state, action);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }

    switch (action.type) {
      case "FETCH_TODOS_REQUEST":
        return true;
      case "FETCH_TODOS_SUCCESS":
      case "FETCH_TODOS_FAILURE":
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }

    switch (action.type) {
      case "FETCH_TODOS_FAILURE":
        return action.message;
      case "FETCH_TODOS_REQUEST":
      case "FETCH_TODOS_SUCCESS":
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage
  });
};

export default createList;

// Selectors map the fields in combineReducers
export const getIds = state => state.ids;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
