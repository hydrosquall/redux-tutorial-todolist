import { combineReducers } from "redux";

import byId, * as fromById from "./byId"; // second namespace = selectors
import createList, * as fromList from "./createList";

const listByFilter = combineReducers({
  all: createList("all"),
  active: createList("active"),
  completed: createList("completed")
});

const todos = combineReducers({
  byId,
  listByFilter
});

export default todos;

// local helper to just get all available todos
// const getAllTodos = state => state.allIds.map(id => state.byId[id]);

// selector that operates on combined state
// A "selector": something that prepares the state for viewing.
// It frees components from knowing about the shape of the state.
export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]); // move responsibility to the backend API
  return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getIsFetching = (state, filter) => {
  const status = fromList.getIsFetching(state.listByFilter[filter]);
  console.log("fetch status:", status);
  return status;
};
