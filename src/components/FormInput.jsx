import React from "react";
import { memo } from "react";

const ErrorMessage = ({ error, errorClass = "invalid-feedback" }) => (
  <small className={errorClass}>{error}</small>
);

const FormInput = ({
  type,
  label,
  value,
  error,
  onChange,
  touched,
  errorClass,
  ...props
}) => (
  <div className="mb-3">
    <label className="form-label">{label}</label>
    <input
      type={type}
      name={label}
      value={value}
      onChange={onChange}
      className={`form-control ${
        touched && (error ? "is-invalid" : "is-valid")
      }`}
      {...props}
    />
    {error && <ErrorMessage errorClass={errorClass} error={error} />}
  </div>
);
export default memo(FormInput);
