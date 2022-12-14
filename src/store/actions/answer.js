import * as actionTypes from "./actions";
import axios from "../../common/axios";
import { actionStart, actionError, actionSuccess } from "./action";

const answersSuccess = (answers) => ({
  type: actionTypes.ANSWER_SUCCESS,
  answers,
});

const answerAdded = (answer) => ({
  type: actionTypes.ANSWER_ADD,
  answer,
});

export const fetchAnswers = (id) => (dispatch, getState) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  axios
    .get(`discussion/${id}/response`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      dispatch(answersSuccess(res.data));
      dispatch(actionSuccess(null));
    })
    .catch((err) => dispatch(actionError("Error fetching the answers.")));
};

export const postResponse = (id, answer) => (dispatch, getState) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  axios
    .post(
      `discussion/${id}/response`,
      { answer },
      { headers: { Authorization: `Token ${token}` } }
    )
    .then((res) => {
      dispatch(answerAdded(res.data));
      dispatch(actionSuccess("Response posted successfully."));
    })
    .catch((err) => {
      dispatch(actionError("Error posting your response."));
    });
};
