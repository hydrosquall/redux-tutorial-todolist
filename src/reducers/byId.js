// operations by ID

// normalizr helps us to use a common shape for all API responses.

// Use dictionary instead of a list to store items
const byId = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_TODOS_SUCCESS":
      const nextState = { ...state };
      // tbd... more functional way to do this?
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    case "ADD_TODO_SUCCESS": // add new item right away into the lookup table
      return {
        ...state,
        [action.response.id]: action.response
      };
    default:
      return state;
  }
};

export default byId;

export const getTodo = (state, id) => state[id];
