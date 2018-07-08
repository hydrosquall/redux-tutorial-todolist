import { createStore } from "redux";
import throttle from "lodash/throttle";
import todoApp from "./reducers";
import { loadState, saveState } from "./localStorage";

// Show how to override base methods
const addLoggingToDispatch = store => {
  return next => {
    if (!console.group) {
      // if non-chrome
      return next;
    }

    return action => {
      console.group(action.type);
      console.log("%c prev state", "color: gray", store.getState());
      console.log("%c action", "color: blue", action);
      const returnValue = next(action);
      console.log("%c next state", "color: green", store.getState());
      console.groupEnd(action.type);
      return returnValue;
    };
  };
};

const addPromiseSupportToDispatch = store => {
  return next => {
    return action => {
      if (typeof action.then === "function") {
        return action.then(next);
      }
      return next(action);
    };
  };
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  middlewares.forEach(
    middleware => (store.dispatch = middleware(store)(store.dispatch)) // 2 functions deep
  );
};

const configureStore = () => {
  // Don't use localStorage now that we have an API set up
  // const persistedState = loadState();
  // const store = createStore(todoApp, persistedState);
  const store = createStore(todoApp);
  const middlewares = [];

  // Only instrument in dev environment
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(addLoggingToDispatch);
  }

  middlewares.push(addPromiseSupportToDispatch);

  wrapDispatchWithMiddlewares(store, middlewares);

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
