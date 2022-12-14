import * as actionTypes from "../actions/actions";
const initialState = {
  key: null,
  details: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.AUTH_RESET:
      return {
        ...state,
        error: null,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        key: action.key,
        details: action.details,
      };
    case actionTypes.AUTH_LOGOUT:
      return { key: null, details: null };
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        details: action.details,
      };
    default:
      return state;
  }
}
