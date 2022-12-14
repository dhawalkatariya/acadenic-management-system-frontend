import * as actionTypes from "../actions/actions";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DISCUSSION_SUCCESS:
      return action.discussions;
    case actionTypes.DISCUSSION_ADD:
      return [action.thread, ...state];
    case actionTypes.RESET_CLASSROOM:
      return null;
    case actionTypes.DISCUSSION_MARKED_SOLVED:
      return state.map((d) => {
        if (d.id !== action.id) return d;
        return { ...d, solved: true };
      });
    default:
      return state;
  }
};
