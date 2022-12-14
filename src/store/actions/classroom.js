import * as actionTypes from "./actions";
import axios from "../../common/axios";
import { actionError, actionSuccess, actionStart } from "./action";
import { optionError, optionSuccess, optionStart } from "./options";

const addClassrooms = (classrooms) => ({
  type: actionTypes.CLASSROOM_SUCCESS,
  classrooms,
});

const addClass = (classroom) => ({
  type: actionTypes.CLASSROOM_ADD_CREATED,
  classroom,
});

const addJoinedClassrooms = (classrooms) => ({
  type: actionTypes.JOINED_CLASSROOM_SUCCESS,
  classrooms,
});

const addClassToJoined = (classroom) => ({
  type: actionTypes.JOINED_CLASSROOM_ADD,
  classroom,
});

export const getActiveClasses = (cb = () => {}) => (dispatch, getState) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  axios
    .get("class/", { headers: { Authorization: `Token ${token}` } })
    .then((res) => {
      dispatch(addClassrooms(res.data));
      dispatch(actionSuccess(null));
      cb();
    })
    .catch((err) => {
      dispatch(actionError("Error fetching classrooms."));
      cb();
    });
};

export const getJoinedClasses = () => (dispatch, getState) => {
  const token = getState().auth.key;
  axios
    .get("class/joined/", { headers: { Authorization: `Token ${token}` } })
    .then((res) => {
      dispatch(addJoinedClassrooms(res.data));
    })
    .catch((err) => {
      dispatch(actionError("Error fetching classrooms."));
    });
};

export const createClass = (name) => (dispatch, getState) => {
  dispatch(optionStart());
  const token = getState().auth.key;
  axios
    .post("class/", { name }, { headers: { Authorization: `Token ${token}` } })
    .then((res) => {
      dispatch(addClass(res.data));
      dispatch(optionSuccess("Class created successfully."));
    })
    .catch((err) => {
      if (err.response.status) {
        dispatch(optionError("Cannot create new classroom."));
      } else dispatch(optionError("Check your internet connection."));
    });
};

export const joinClass = (invitation_code) => (dispatch, getState) => {
  dispatch(optionStart());
  const token = getState().auth.key;
  axios
    .post(
      `class/join/`,
      { invitation_code },
      { headers: { Authorization: `Token ${token}` } }
    )
    .then((res) => {
      dispatch(addClassToJoined(res.data));
      dispatch(optionSuccess("Class joined"));
    })
    .catch((err) => {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 400) dispatch(optionError(data.invitation_code.flat()));
        else if (status === 404)
          dispatch(optionError("Cannot find classroom."));
        else if (status === 500)
          dispatch(optionError("Internal server error."));
      } else dispatch(optionError("Check your internet connection."));
    });
};
