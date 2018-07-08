import { createStore, applyMiddleware } from "redux";
import todoApp from "./reducers";

// Production versions of our local middleware
import promise from "redux-promise";
import createLogger from "redux-logger";

const configureStore = () => {
  const middlewares = [promise];

  // Only instrument in dev environment
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger);
  }

  const store = createStore(
    todoApp,
    // persistedState would go in middle,
    //enhancers go last
    applyMiddleware(...middlewares)
  );

  return store;
};

export default configureStore;
