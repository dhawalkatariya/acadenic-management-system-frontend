import React, { useEffect } from "react";
import EmptyPage from "../components/EmptyPage";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { getName } from "../common/utils";
import { connect } from "react-redux";
import { fetchStudents } from "../store/actions/student";

const Students = (props) => {
  const { loading, error, students, id } = props;
  useEffect(() => {
    if (!students) props.fetchStudents(id);
  }, []);
  if (error) return <Message message={error} />;
  if (loading || !students) return <Spinner />;
  if (students.length === 0)
    return <EmptyPage backButton>No Students</EmptyPage>;
  return (
    <ul className="list-group">
      {students.map((s) => (
        <li className="list-group-item" key={s.username}>
          <h5 className="font-weight-light my-1">
            <i className="fa fa-user mr-2"></i> {getName(s)}
          </h5>
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  id: state.action.classroom.id,
  students: state.students,
  loading: state.action.loading,
  error: state.action.error,
});

const mapDispatchToProps = {
  fetchStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);
