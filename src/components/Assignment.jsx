import React, { memo } from "react";
import { formatDate } from "../common/utils";
import { Link } from "react-router-dom";

export const SimpleAssignment = memo(({ assignment, path }) => (
  <div className="card card-body shadow-sm mb-2">
    <h2>
      <Link to={path} className="text-decoration-none">
        {assignment.title}
      </Link>
    </h2>
    <p className="font-weight-bold text-muted mb-0">
      {assignment.num_questions} Question(s)
    </p>
    <p className="text-muted mb-0">{formatDate(assignment.created_on)}</p>
  </div>
));

const Assignment = ({ assignment, path }) => (
  <div className="card d-flex flex-direction-row mb-2 shadow-sm">
    {assignment.grade && (
      <div className="solved-section">
        <h2>{assignment.grade.marks}</h2>
        <h2>{assignment.grade.total_marks}</h2>
      </div>
    )}
    <div
      className={assignment.grade ? "solved-assignment" : "unsolved-assignment"}
    >
      <h2>
        {!assignment.grade ? (
          <Link to={path} className="text-decoration-none">
            {assignment.title}
          </Link>
        ) : (
          assignment.title
        )}
      </h2>
      <p className="font-weight-bold text-muted mb-0">
        {assignment.num_questions} Question(s)
      </p>
      <p className="text-muted mb-0">{formatDate(assignment.created_on)}</p>
    </div>
  </div>
);

export default memo(Assignment);
