import * as actionTypes from "../actions/actions";
const initialState = {
  loading: false,
  error: null,
  success: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.OPTION_START:
      return { ...state, loading: true, error: null, success: null };
    case actionTypes.OPTION_SUCCESS:
      return { ...state, loading: false, success: action.success };
    case actionTypes.OPTION_ERROR:
      return { ...state, loading: false, error: action.error };
    case actionTypes.RESET_CLASSROOM:
      return initialState;
    case actionTypes.AUTH_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
