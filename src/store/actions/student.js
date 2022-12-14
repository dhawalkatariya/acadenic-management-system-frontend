import * as actionTypes from "./actions";
import axios from "../../common/axios";
import { actionStart, actionError, actionSuccess } from "./action";

const studentSuccess = (students) => ({
  type: actionTypes.STUDENT_SUCCESS,
  students,
});

export const fetchStudents = (id) => (dispatch, getState) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  axios
    .get(`class/${id}/students/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      dispatch(studentSuccess(res.data));
      dispatch(actionSuccess(null));
    })
    .catch((err) => dispatch(actionError("Error fetching students")));
};
