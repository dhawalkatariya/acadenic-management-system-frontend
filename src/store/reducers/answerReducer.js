import * as actionTypes from "../actions/actions";
const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ANSWER_SUCCESS:
      return action.answers;
    case actionTypes.RESET_CLASSROOM:
      return null;
    case actionTypes.ANSWER_ADD:
      return [action.answer, ...state];
    default:
      return state;
  }
};
