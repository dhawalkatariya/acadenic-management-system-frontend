import * as actionTypes from "../actions/actions";
const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STUDENT_SUCCESS:
      return action.students;
    case actionTypes.RESET_CLASSROOM:
      return null;
    default:
      return state;
  }
};
