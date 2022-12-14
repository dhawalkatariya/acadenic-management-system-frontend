import React, { useEffect } from "react";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import EmptyPage from "../components/EmptyPage";
import Assignment, { SimpleAssignment } from "../components/Assignment";
import { fetchAssignments } from "../store/actions/assignment";
import { connect } from "react-redux";

const Assignments = (props) => {
  const { assignments, loading, error, id, created } = props;
  useEffect(() => {
    if (!assignments) props.fetchAssignments(id, created);
  }, []);
  if (error) return <Message message={error} />;
  if (loading || !assignments) return <Spinner />;
  if (assignments.length === 0)
    return <EmptyPage backButton>No Assignments</EmptyPage>;
  if (props.created)
    return assignments.map((a) => (
      <SimpleAssignment
        assignment={a}
        key={a.id}
        path={`${props.match.path}/${a.id}/questions`}
      />
    ));
  return assignments.map((a) => (
    <Assignment
      assignment={a}
      key={a.id}
      path={`${props.match.path}/${a.id}/submit`}
    />
  ));
};

const mapStateToProps = (state) => ({
  id: state.action.classroom.id,
  created: state.action.classroom.created,
  assignments: state.assignments,
  loading: state.action.loading,
  error: state.action.error,
});

const mapDispatchToProps = {
  fetchAssignments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);
