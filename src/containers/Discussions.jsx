import React, { useEffect } from "react";
import EmptyPage from "../components/EmptyPage";
import Question from "../components/Question";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import AskQuestion from "../components/AskQuestion";
import { fetchDiscussions } from "../store/actions/discussion";
import { connect } from "react-redux";

const Discussions = (props) => {
  const { discussions, loading, error, id, created } = props;
  useEffect(() => {
    if (!discussions) props.fetchDiscussions(id);
  }, []);
  if (error) return <Message message={error} />;
  if (loading || !discussions) return <Spinner />;
  if (discussions.length === 0)
    return <EmptyPage backButton>No Questions Currently</EmptyPage>;
  return (
    <>
      {!created && <AskQuestion id={id} />}
      <ul className="list-group">
        {discussions.map((q) => (
          <li className="list-group-item" key={q.id}>
            <Question thread={q} url={`${props.match.path}/${q.id}`} />
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = ({
  action: { classroom, loading, error },
  discussions,
}) => ({
  id: classroom.id,
  created: classroom.created,
  loading: loading,
  error: error,
  discussions: discussions,
});

const mapDispatchToProps = {
  fetchDiscussions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Discussions);
