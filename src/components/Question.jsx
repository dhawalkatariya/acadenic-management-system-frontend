import React, { memo } from "react";
import { getName, formatDate } from "../common/utils";
import { Link } from "react-router-dom";

const Question = ({ thread, url }) => {
  const { created_by, submitted_on, question, solved } = thread;
  return (
    <>
      <span className={`badge bg-${solved ? "success" : "danger"}`}>
        {solved ? "Solved" : "Unsolved"}
      </span>
      <h4>
        <Link to={url}>{question}</Link>
      </h4>
      <p className="mb-0 text-muted">
        - <i className="fa fa-user ml-1"></i> {getName(created_by)} on{" "}
        {formatDate(submitted_on)}
      </p>
    </>
  );
};

export default memo(Question);
