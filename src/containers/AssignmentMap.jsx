import React from "react";
import Resource from "../components/Resource";
import { Question, Info } from "./SubmitAssignment";

const AssignmentMap = ({ id }) => (
  <div className="card card-body">
    <Resource
      url={`assignment/${id}/`}
      render={(assignment) => {
        const { title, created_on, questions } = assignment;
        return (
          <>
            <Info title={title} created_on={created_on} />
            {questions.map((q, i) => (
              <Question disabled index={i} question={q} key={q.id} />
            ))}
          </>
        );
      }}
    />
  </div>
);

export default AssignmentMap;
