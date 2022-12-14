import * as actionTypes from "./actions";
import axios from "../../common/axios";
import { actionStart, actionError, actionSuccess } from "./action";

const discussionSuccess = (discussions) => ({
  type: actionTypes.DISCUSSION_SUCCESS,
  discussions,
});

const addNewThread = (thread) => ({ type: actionTypes.DISCUSSION_ADD, thread });

const questionMarkedSolved = (id) => ({
  type: actionTypes.DISCUSSION_MARKED_SOLVED,
  id,
});

export const fetchDiscussions = (id) => (dispatch, getState) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  axios
    .get(`discussion/${id}`, { headers: { Authorization: `Token ${token}` } })
    .then((res) => {
      dispatch(discussionSuccess(res.data));
      dispatch(actionSuccess(null));
    })
    .catch((err) => dispatch(actionError("Error fetching questions.")));
};

export const askQuestion = (id, question) => (dispatch, getState) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  axios
    .post(
      `/discussion/${id}`,
      { question },
      { headers: { Authorization: `Token ${token}` } }
    )
    .then((res) => {
      dispatch(addNewThread(res.data));
      dispatch(actionSuccess("Successfully posted your question."));
    })
    .catch((err) => dispatch(actionError("Error posting your question.")));
};

export const markSolved = (id) => (dispatch, getState) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  axios
    .put(
      `discussion/${id}/solved`,
      { solved: true },
      {
        headers: { Authorization: `Token ${token}` },
      }
    )
    .then((res) => {
      dispatch(questionMarkedSolved(res.data.id));
      dispatch(actionSuccess("Marked"));
    })
    .catch((err) =>
      dispatch(actionError("Error marking this question solved."))
    );
};
