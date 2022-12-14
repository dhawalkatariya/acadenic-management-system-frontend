import React, { memo } from "react";
import EmptyPage from "./EmptyPage";
import { formatDate, getName } from "../common/utils";

const Answer = ({ answer, by, submitted_on }) => (
  <li className="list-group-item">
    <p className="mb-2" style={{ fontSize: "1.1rem" }}>
      {answer}
    </p>
    <p className="mb-0 text-muted">
      <i className="fa fa-user"></i> {getName(by)} on {formatDate(submitted_on)}
    </p>
  </li>
);

const Answers = ({ answers }) => {
  if (answers.length === 0)
    return <EmptyPage backButton>No responses yet.</EmptyPage>;
  return (
    <ul className="list-group mt-2">
      {answers.map((a) => (
        <Answer key={a.id} {...a} />
      ))}
    </ul>
  );
};

export default memo(Answers);
