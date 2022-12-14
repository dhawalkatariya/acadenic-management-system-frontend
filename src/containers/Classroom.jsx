import React, { memo } from "react";
import TabNavigation from "../components/TabNavigation";
import Materials from "./Materials";
import InfoTile from "../components/InfoTile";
import PostMaterial from "./PostMaterial";
import Discussions from "./Discussions";
import SubmitAssignment from "./SubmitAssignment";
import DiscussionThread from "./DiscussionThread";
import SubmissionDetails from "./SubmissionDetails";
import PostAssignment from "./PostAssignment";
import Assignments from "./Assignments";
import Students from "./Students";
import PrivateRoute from "../components/PrivateRoute";
import { Redirect, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

const Navigation = memo(({ path, created }) => {
  const links = [
    { label: "Stream", url: `${path}/stream`, icon: "book" },
    {
      label: "Assignments",
      url: `${path}/assignments`,
      icon: "pencil-square",
    },
    { label: "Discussion", url: `${path}/discussions`, icon: "comments" },
    { label: "Students", url: `${path}/students`, icon: "users" },
  ];
  if (created) {
    links.splice(
      1,
      0,
      {
        label: "Post Material",
        url: `${path}/post-material`,
        icon: "plus",
      },
      {
        label: "Post Assignment",
        url: `${path}/post-assignment`,
        icon: "pencil",
      }
    );
  }
  return <TabNavigation vertical links={links} type="pills" />;
});

const Classroom = (props) => {
  if (!props.classroom) return <Redirect to="/dashboard" />;
  const {
    classroom: { name, created_by, invitation_code },
    created,
  } = props;
  const path = props.match.url;
  return (
    <>
      <InfoTile
        createdBy={created_by}
        name={name}
        invitation_code={invitation_code}
      />
      <div className="row g-2">
        <div className="col-12 col-lg-4 col-xl-3">
          <div className="card sticky-top">
            <Navigation created={props.created} path={path} />
          </div>
        </div>
        <div className="col-12 col-lg-8 col-xl-9">
          <Switch>
            <Route path={`${path}/stream`} component={Materials} />
            <Route path={`${path}/students`} component={Students} />
            <Route exact path={`${path}/assignments`} component={Assignments} />
            <Route exact path={`${path}/discussions`} component={Discussions} />
            <Route
              path={`${path}/discussions/:id`}
              component={DiscussionThread}
            />
            <PrivateRoute
              activate={created}
              component={PostMaterial}
              path={`${path}/post-material`}
            />
            <PrivateRoute
              activate={created}
              path={`${path}/post-assignment`}
              component={PostAssignment}
            />
            <PrivateRoute
              exact
              activate={!created}
              path={`${path}/assignments/:id/submit`}
              component={SubmitAssignment}
            />
            <PrivateRoute
              activate={created}
              path={`${path}/assignments/:id`}
              component={SubmissionDetails}
            />
            <Redirect to={`${path}/stream`} />
          </Switch>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { created = false, id = null } = state.action.classroom;
  let classroom = null;
  if (created && state.created)
    classroom = state.created.find(({ id: classId }) => id === classId);
  else if (state.joined)
    classroom = state.joined.find(({ id: classId }) => id === classId);
  return { classroom, created };
};

export default connect(mapStateToProps)(Classroom);
