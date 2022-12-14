import * as actionTypes from "../actions/actions";

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.CLASSROOM_SUCCESS:
      return action.classrooms;
    case actionTypes.CLASSROOM_ADD_CREATED:
      return state.concat(action.classroom);
    case actionTypes.AUTH_LOGOUT:
      return null;
    default:
      return state;
  }
}
