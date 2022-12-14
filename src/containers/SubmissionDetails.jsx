import React, { memo } from "react";
import ResponseTable from "./ResponseTable";
import TabNavigation from "../components/TabNavigation";
import AssignmentMap from "./AssignmentMap";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navigation = memo(({ path }) => {
  return (
    <TabNavigation
      links={[
        { url: `${path}/questions`, label: "Question(s)", icon: "question" },
        { url: `${path}/responses`, label: "Response(s)", icon: "sticky-note" },
      ]}
    />
  );
});

const SubmissionDetails = (props) => {
  const id = +props.match.params.id;
  const assignment = useSelector((state) =>
    state.assignments.find((a) => a.id === id)
  );
  const path = props.match.url;
  return (
    <>
      <div className="card card-body mb-2">
        <h4 className="mb-0">
          <Link
            to={props.match.url.substring(0, props.match.url.lastIndexOf("/"))}
            className="fa fa-arrow-left mr-3 text-decoration-none"
          />
          {assignment.title}
        </h4>
      </div>
      <Navigation path={path} />
      <Route
        exact
        path={`${path}/questions`}
        render={() => <AssignmentMap id={id} />}
      />
      <Route
        exact
        path={`${path}/responses`}
        render={() => <ResponseTable id={id} name={assignment.title} />}
      />
    </>
  );
};

export default SubmissionDetails;
