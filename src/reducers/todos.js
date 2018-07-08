import { combineReducers } from "redux";

// Use dictionary instead of a list to store items
const byId = (state = {}, action) => {
  switch (action.type) {
    case "RECEIVE_TODOS":
      const nextState = { ...state };
      // tbd... more functional way to do this?
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};

// List of all todoIds
const allIds = (state = [], action) => {
  if (action.filter !== "all") {
    return state;
  }
  switch (action.type) {
    case "RECEIVE_TODOS":
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const activeIds = (state = [], action) => {
  if (action.filter !== "active") {
    return state;
  }
  switch (action.type) {
    case "RECEIVE_TODOS":
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const completedIds = (state = [], action) => {
  if (action.filter !== "completed") {
    return state;
  }
  switch (action.type) {
    case "RECEIVE_TODOS":
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds
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
  return ids.map(id => state.byId[id]);
};
