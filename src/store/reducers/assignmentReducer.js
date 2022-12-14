import * as actionTypes from "../actions/actions";
const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ASSIGNMENT_SUCCESS:
      return action.assignments;
    case actionTypes.RESET_CLASSROOM:
      return null;
    case actionTypes.ASSIGNMENT_SUBMITTED:
      return state.map((a) => {
        if (a.id === action.grade.assignment)
          return { ...a, grade: action.grade };
        return a;
      });
    case actionTypes.ASSIGNMENT_ADD:
      return state ? [action.assignment, ...state] : null;
    default:
      return state;
  }
};
