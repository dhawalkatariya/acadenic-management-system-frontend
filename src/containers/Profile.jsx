import React, { useEffect } from "react";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { connect } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../store/actions/auth";
import { actionReset } from "../store/actions/action";

const Profile = (props) => {
  useEffect(() => {
    props.actionReset();
  }, []);
  const { email, username } = props.details;
  const [first_name, setFirstName] = useState(props.details.first_name);
  const [last_name, setLastName] = useState(props.details.last_name);
  if (props.loading) return <Spinner />;
  return (
    <div className="row">
      <div className="col-sm-6 col-12">
        <img src="avatar.svg" alt="Avatar" className="img-fluid p-4" />
      </div>
      <div className="col-sm-6 col-12 mb-4">
        <h3 className="display-4 my-3">Profile</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.updateProfile(first_name, last_name, username);
          }}
        >
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              readOnly="readonly"
              value={username}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              readOnly="readonly"
              value={email}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              value={first_name}
              className="form-control"
              placeholder="Enter your first name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              value={last_name}
              className="form-control"
              placeholder="Enter your last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {props.error && <Message message={props.error} />}
          {props.success && <Message success message={props.success} />}
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  details: state.auth.details,
  loading: state.action.loading,
  error: state.action.error,
  success: state.action.success,
});

const mapDispatchToProps = { updateProfile, actionReset };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
