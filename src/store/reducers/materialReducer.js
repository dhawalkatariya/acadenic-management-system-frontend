import * as actionTypes from "../actions/actions";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MATERIAL_SUCCESS:
      return action.material;
    case actionTypes.RESET_CLASSROOM:
      return null;
    case actionTypes.MATERIAL_ADD:
      return [action.material, ...state];
    case actionTypes.MATERIAL_DELETE:
      const newMaterial = state.filter((m) => m.id !== action.id);
      return newMaterial;
    default:
      return state;
  }
};
