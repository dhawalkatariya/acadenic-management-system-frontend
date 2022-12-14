import React, { useState, useCallback } from "react";
import FormInput from "../components/FormInput";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import { connect } from "react-redux";
import { changePassword } from "../store/actions/auth";
import { actionReset } from "../store/actions/action";
import { useEffect } from "react";

function ChangePassword(props) {
  useEffect(() => {
    props.actionReset();
  }, []);
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState(null);
  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === "pass1") setPass1(value);
      else setPass2(value);
    },
    [setPass1, setPass2]
  );
  const onSubmit = (e) => {
    e.preventDefault();
    if (pass1.length < 8)
      return setError("Password must contain atleast 8 characters.");
    else if (pass1 !== pass2) return setError("Both passwords should match.");
    else if (error !== null) return setError(null);
    props.changePassword(pass1);
  };
  if (props.loading) return <Spinner />;
  return (
    <>
      <h1 className="display-4 my-4">Change Password</h1>
      <hr />
      <form onSubmit={onSubmit}>
        <FormInput
          name="pass1"
          type="password"
          label="New password"
          errorClass="text-danger"
          placeholder="Enter your new password"
          value={pass1}
          error={error}
          onChange={onChange}
        />
        <FormInput
          name="pass2"
          type="password"
          label="Confirm password"
          placeholder="Enter your new password once more"
          value={pass2}
          onChange={onChange}
        />
        {props.error && <Message message={props.error} />}
        {props.success && <Message success message={props.success} />}
        <button
          type="submit"
          className="btn-primary btn mr-2"
          disabled={pass1 === "" || pass2 === ""}
        >
          Change Password
        </button>
        <button type="reset" className="btn btn-danger">
          Reset
        </button>
      </form>
    </>
  );
}

const mapStateToProps = (state) => ({
  loading: state.action.loading,
  error: state.action.error,
  success: state.action.success,
});

const mapDispatchToProps = {
  changePassword,
  actionReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
