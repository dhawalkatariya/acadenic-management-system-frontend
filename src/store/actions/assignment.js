import * as actionTypes from "./actions";
import axios from "../../common/axios";
import { actionStart, actionSuccess, actionError } from "./action";

const assignmentSuccess = (assignments) => ({
  type: actionTypes.ASSIGNMENT_SUCCESS,
  assignments,
});

const newAssignmentAdded = (assignment) => ({
  type: actionTypes.ASSIGNMENT_ADD,
  assignment,
});

const assignmentSubmitted = (grade) => ({
  type: actionTypes.ASSIGNMENT_SUBMITTED,
  grade,
});

export const postAssignment = (obj) => (dispatch, getState) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  axios
    .post(`assignment/`, obj, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      dispatch(actionSuccess("Successfully posted the assignment"));
      dispatch(
        newAssignmentAdded({ ...res.data, num_questions: obj.questions.length })
      );
    })
    .catch((err) => dispatch(actionError("Error posting the assignment.")));
};

export const fetchAssignments = (id, created = false) => (
  dispatch,
  getState
) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  axios
    .get(`assignment/${id}/list/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then(async (res) => {
      dispatch(actionSuccess(null));
      if (created) return dispatch(assignmentSuccess(res.data));
      const grades = await axios
        .get(`assignment/${id}/graded/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => res.data);
      let i = 0;
      const arr = res.data.map((a) => {
        if (grades.length === i) return a;
        if (a.id === grades[i].assignment) return { ...a, grade: grades[i++] };
        return a;
      });
      dispatch(assignmentSuccess(arr));
    })
    .catch((err) => {
      dispatch(actionError("Error fetching assignments."));
    });
};

export const submitAssignment = (id, answers, cb) => (dispatch, getState) => {
  const token = getState().auth.key;
  dispatch(actionStart());
  axios
    .post(
      `assignment/${id}/submit/`,
      { answers },
      { headers: { Authorization: `Token ${token}` } }
    )
    .then((res) => {
      dispatch(assignmentSubmitted(res.data));
      dispatch(actionSuccess(null));
      cb();
    })
    .catch((err) => dispatch(actionError("Unable to submit your assignment.")));
};
