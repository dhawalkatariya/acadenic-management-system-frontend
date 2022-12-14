import * as actionTypes from "./actions";

export const actionStart = () => ({
  type: actionTypes.ACTION_START,
});

export const actionSuccess = (success) => ({
  type: actionTypes.ACTION_SUCCESS,
  success,
});

export const actionError = (error) => ({
  type: actionTypes.ACTION_ERROR,
  error,
});

export const actionReset = () => ({
  type: actionTypes.ACTION_RESET,
});

export const resetClassroom = () => ({
  type: actionTypes.RESET_CLASSROOM,
});

export const setClassroom = (id, created) => ({
  type: actionTypes.SET_CLASSROOM,
  id,
  created,
});
