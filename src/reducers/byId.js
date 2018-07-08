// operations by ID

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

export default byId;
