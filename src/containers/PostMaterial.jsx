import React, { useState, useEffect } from "react";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import { connect } from "react-redux";
import { uploadMaterial } from "../store/actions/material";
import { actionReset } from "../store/actions/action";

const PostMaterial = (props) => {
  useEffect(() => {
    props.actionReset();
  }, []);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  if (props.loading) return <Spinner />;
  return (
    <form
      className="card card-body"
      onSubmit={(e) => {
        e.preventDefault();
        if (!message) return setError("You cannot leave message blank.");
        props.uploadMaterial(props.id, file, message, url);
      }}
    >
      <h3 className="text-center">Add Material</h3>
      <div className="mb-2">
        <label className="form-label">Attachment</label>
        <div className="form-file">
          <input
            type="file"
            className="form-file-input"
            multiple={false}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <label className="form-file-label">
            <span className="form-file-text">
              {file ? file.name : "Select File"}
            </span>
            <span className="form-file-button">Browse</span>
          </label>
        </div>
      </div>
      <div className="mb-2">
        <label className="form-label">Link</label>
        <input
          type="url"
          className="form-control"
          placeholder="Enter any external link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Message</label>
        <textarea
          value={message}
          rows="5"
          placeholder="Enter message"
          className={`form-control ${error ? "is-invalid" : ""}`}
          onChange={(e) => setMessage(e.target.value)}
        />
        {error && <small className="invalid-feedback">{error}</small>}
      </div>
      {props.success && <Message success message={props.success} />}
      {props.error && <Message message={props.error} />}
      <button type="submit" className="btn create-class">
        Add Material
      </button>
    </form>
  );
};

const mapStateToProps = ({
  action: { classroom, loading, error, success },
}) => ({
  id: classroom.id,
  loading: loading,
  error: error,
  success: success,
});

const mapDispatchToProps = {
  uploadMaterial,
  actionReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostMaterial);
