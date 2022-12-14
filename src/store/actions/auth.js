import * as actionTypes from "./actions";
import axios from "../../common/axios";
import { actionError, actionStart, actionSuccess } from "./action";

const authSuccess = (key, details) => {
  localStorage.setItem("key", key);
  localStorage.setItem("details", JSON.stringify(details));
  return { type: actionTypes.AUTH_SUCCESS, key, details };
};

const updateProfileSuccess = (details) => {
  localStorage.setItem("details", JSON.stringify(details));
  return {
    type: actionTypes.UPDATE_PROFILE_SUCCESS,
    details,
  };
};

export const authReset = () => ({
  type: actionTypes.AUTH_RESET,
});

export const logOut = () => {
  localStorage.removeItem("key");
  localStorage.removeItem("details");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authenticate = (username, password) => async (dispatch) => {
  dispatch(actionStart());
  try {
    const { key } = (
      await axios.post("auth/login/", { username, password })
    ).data;
    const details = (
      await axios.get("auth/user/", {
        headers: { Authorization: `Token ${key}` },
      })
    ).data;
    dispatch(authSuccess(key, details));
    dispatch(actionSuccess(null));
  } catch (err) {
    handleAuthError(err, dispatch);
  }
};

export const signUp = (email, username, password1) => async (dispatch) => {
  dispatch(actionSuccess());
  try {
    const { key } = (
      await axios.post("auth/registration", {
        email,
        username,
        password1,
        password2: password1,
      })
    ).data;
    const details = (
      await axios.get("auth/user/", {
        headers: { Authorization: `Token ${key}` },
      })
    ).data;
    dispatch(authSuccess(key, details));
    dispatch(actionSuccess(null));
  } catch (err) {
    handleAuthError(err, dispatch);
  }
};

export const updateProfile = (first_name, last_name, username) => (
  dispatch,
  getState
) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  axios
    .put(
      "auth/user/",
      { first_name, last_name, username },
      { headers: { Authorization: `Token ${token}` } }
    )
    .then((res) => {
      dispatch(updateProfileSuccess(res.data));
      dispatch(actionSuccess("Successfully updated your profile."));
    })
    .catch((err) => {
      if (!err.response)
        dispatch(actionError("Check your internet connection."));
      else dispatch(actionError("Error updating your profile."));
    });
};

export const changePassword = (password) => (dispatch, getState) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  axios
    .post(
      "auth/password/change/",
      {
        new_password1: password,
        new_password2: password,
      },
      { headers: { Authorization: `Token ${token}` } }
    )
    .then((res) => {
      dispatch(actionSuccess("Successfully changed your password."));
    })
    .catch((err) => {
      if (!err.response)
        dispatch(actionError("Check your internet connection."));
      handleAuthError(err, dispatch);
    });
};

const handleAuthError = (err, dispatch) => {
  if (!err.response)
    dispatch(actionError("Error signing in, Check your internet connection"));
  else if (err.response.status === 400) {
    const data = err.response.data;
    dispatch(
      actionError(
        Object.keys(data)
          .map((k) => data[k])
          .flat()
      )
    );
  } else dispatch(actionError("Unknown error occurred."));
};
