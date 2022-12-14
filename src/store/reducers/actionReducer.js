import * as actionTypes from "../actions/actions";
const initialState = {
  loading: false,
  error: null,
  success: null,
  classroom: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CLASSROOM:
      return {
        ...state,
        classroom: { id: action.id, created: action.created },
      };
    case actionTypes.RESET_CLASSROOM:
      return { ...state, classroom: {} };
    case actionTypes.ACTION_RESET:
      return { ...state, success: null, error: null, loading: false };
    case actionTypes.ACTION_START:
      return { ...state, loading: true, error: null, success: null };
    case actionTypes.ACTION_SUCCESS:
      return { ...state, loading: false, success: action.success };
    case actionTypes.ACTION_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
