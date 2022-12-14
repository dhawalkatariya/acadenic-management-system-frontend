import * as actionTypes from "./actions";

export const optionStart = () => ({
  type: actionTypes.OPTION_START,
});

export const optionSuccess = (success) => ({
  type: actionTypes.OPTION_SUCCESS,
  success,
});

export const optionError = (error) => ({
  type: actionTypes.OPTION_ERROR,
  error,
});
