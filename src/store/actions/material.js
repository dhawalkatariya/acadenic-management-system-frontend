import * as actionTypes from "./actions";
import axios from "../../common/axios";
import { actionStart, actionError, actionSuccess } from "./action";

const addMaterial = (material) => ({
  type: actionTypes.MATERIAL_SUCCESS,
  material,
});

const removeMaterial = (id) => ({
  type: actionTypes.MATERIAL_DELETE,
  id,
});

const addNewMaterial = (material) => ({
  type: actionTypes.MATERIAL_ADD,
  material,
});

export const fetchMaterial = (id) => (dispatch, getState) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  axios
    .get(`material/${id}/list/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      dispatch(addMaterial(res.data));
      dispatch(actionSuccess(null));
    })
    .catch((err) => dispatch(actionError("Error fetching material.")));
};

export const uploadMaterial = (id, file, message, url) => (
  dispatch,
  getState
) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  const fd = new FormData();
  if (file) fd.append("attachment", file, file.name);
  fd.append("message", message);
  fd.append("url", url);
  fd.append("classroom", id);
  axios
    .post("material/", fd, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      dispatch(actionSuccess("Material uploaded successfully."));
      dispatch(addNewMaterial(res.data));
    })
    .catch((err) => dispatch(actionError("Error uploading material.")));
};

export const deleteMaterial = (id) => (dispatch, getState) => {
  dispatch(actionStart());
  const token = getState().auth.key;
  axios
    .delete(`material/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      dispatch(removeMaterial(id));
      dispatch(actionSuccess(null));
    })
    .catch((err) => {
      let error = "Error deleting material, check your internet connection.";
      if (err.response) error = err.response.data.details;
      dispatch(actionError(null));
      alert(error);
    });
};
