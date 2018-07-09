// operations by ID

// normalizr helps us to use a common shape for all API responses.

// Use dictionary instead of a list to store items
const byId = (state = {}, action) => {
  if (action.response) {
    // with normalizr, we can do a blanket merge regardless of how many show up
    return {
      ...state,
      ...action.response.entities.todos
    };
  }

  return state;
};

export default byId;

export const getTodo = (state, id) => state[id];
