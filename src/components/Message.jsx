import React, { memo } from "react";

const Message = ({ message, success = false }) => {
  const classes = `my-2 alert alert-${success ? "success" : "danger"}`;
  if (message instanceof Array)
    return (
      <div className={classes}>
        <ul className="mb-0">
          {message.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
    );
  return <div className={classes}>{message}</div>;
};
export default memo(Message);
