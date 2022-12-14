import React, { useState } from "react";
import Spinner from "./Spinner";
import Message from "./Message";
import { joinClass, createClass } from "../store/actions/classroom";
import { actionReset } from "../store/actions/action";
import { connect } from "react-redux";

const Options = (props) => {
  const [className, setClassName] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  if (props.loading) return <Spinner />;
  return (
    <div className="card card-body">
      <h6>Create new class</h6>
      <input
        type="text"
        className="form-control mb-2"
        value={className}
        placeholder="Enter new class name"
        onChange={(e) => setClassName(e.target.value)}
      />
      <button
        disabled={!className}
        className="create-class btn-block btn mb-3"
        onClick={() => {
          if (className === "") return;
          props.createClass(className);
        }}
      >
        <i className="fa fa-plus"></i> Create
      </button>
      <h6>Join class</h6>
      <input
        type="text"
        value={invitationCode}
        className="form-control mb-2"
        placeholder="Enter invitation code"
        onChange={(e) => setInvitationCode(e.target.value)}
      />
      <button
        disabled={invitationCode.length < 12}
        className="btn join-class btn-block"
        onClick={() => {
          if (invitationCode === "") return;
          props.joinClass(invitationCode);
        }}
      >
        <i className="fa fa-user-plus"></i> Join
      </button>
      {props.error && <Message message={props.error} />}
      {props.success && <Message success message={props.success} />}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.option.loading,
  error: state.option.error,
  success: state.option.success,
});

const mapDispatchToProps = {
  createClass,
  joinClass,
  actionReset,
};
export default connect(mapStateToProps, mapDispatchToProps)(Options);
