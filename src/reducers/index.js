import { combineReducers } from "redux";
// Alias since the function names would otherwise collide.
import todos, * as fromTodos from "./todos";

const todoApp = combineReducers({
  todos
});

export default todoApp;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
