import { combineReducers } from "redux";

import byId, * as fromById from "./byId";

const createList = filter => {
  return (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "RECEIVE_TODOS":
        return action.response.map(todo => todo.id);
      default:
        return state;
    }
  };
};

const idsByFilter = combineReducers({
  all: createList("all"),
  active: createList("active"),
  completed: createList("completed")
});

const todos = combineReducers({
  byId,
  idsByFilter
});

export default todos;

// local helper to just get all available todos
// const getAllTodos = state => state.allIds.map(id => state.byId[id]);

// selector that operates on combined state
// A "selector": something that prepares the state for viewing.
// It frees components from knowing about the shape of the state.
export const getVisibleTodos = (state, filter) => {
  const ids = state.idsByFilter[filter]; // move responsibility to the backend API
  console.log(state.idsByFilter);
  return ids.map(id => state.byId[id]);
};
