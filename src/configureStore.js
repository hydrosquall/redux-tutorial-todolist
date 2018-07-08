import { createStore } from "redux";
import throttle from "lodash/throttle";
import todoApp from "./reducers";
import { loadState, saveState } from "./localStorage";

// Show how to override base methods
const addLoggingToDispatch = store => {
  const next = store.dispatch;
  if (!console.group) {
    // if non-chrome
    return next;
  }

  return action => {
    console.group(action.type);
    console.log("%c prev state", "color: gray", store.getState());
    console.log("%c action", "color: blue", action);
    const returnValue = rawDispatch(action);
    console.log("%c next state", "color: green", store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const addPromiseSupportToDispatch = store => {
  const next = store.dispatch; // b/c it pulls the most recent dispatch, may not be raw
  return action => {
    if (typeof action.then === "function") {
      return action.then(next);
    }
    return next(action);
  };
};

const configureStore = () => {
  const persistedState = loadState();
  loadState();
  const store = createStore(todoApp, persistedState);

  // Only instrument in dev environment
  if (process.env.NODE_ENV !== "production") {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.dispatch = addPromiseSupportToDispatch(store);

  store.subscribe(
    throttle(() => {
      saveState({
        todos: store.getState().todos
      });
    }, 1000)
  );

  return store;
};

export default configureStore;
