import React, { useEffect, useState } from "react";
import ReduxResource from "../components/ReduxResource";
import Answers from "../components/Answers";
import BreadCrumb from "../components/Breadcrumb";
import Message from "../components/Message";
import { markSolved } from "../store/actions/discussion";
import { fetchAnswers, postResponse } from "../store/actions/answer";
import { actionReset } from "../store/actions/action";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getName, formatDate } from "../common/utils";

const mstp = (state) => ({
  loading: state.action.loading,
  success: state.action.success,
});

const mdtp = { postResponse, actionReset, markSolved };

const PostResponse = connect(
  mstp,
  mdtp
)((props) => {
  useEffect(() => {
    props.actionReset();
  }, []);
  const [response, setResponse] = useState("");
  return (
    <div className="card card-body mt-2 mb-4">
      <h5>Submit your response</h5>
      <textarea
        rows="5"
        value={response}
        disabled={props.loading}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Enter your response"
        className="form-control mb-1"
      />
      {props.success && <Message success message={props.success} />}
      <div className="btn-group mt-1">
        <button
          disabled={!response || props.loading}
          className="btn btn-primary"
          onClick={() => props.postResponse(props.id, response)}
        >
          Submit
        </button>
        {props.isCreator && (
          <button
            className="btn btn-success"
            onClick={() => props.markSolved(props.id)}
          >
            Mark as solved
          </button>
        )}
        <button className="btn btn-danger" onClick={() => setResponse("")}>
          Reset
        </button>
      </div>
    </div>
  );
});

const DiscussionThread = (props) => {
  const id = props.match.params.id;
  useEffect(() => {
    if (props.discussion) props.fetchAnswers(id);
    return () => props.actionReset();
  }, []);
  if (!props.discussion) return <Redirect to="/dashboard/created" />;
  const { question, submitted_on, solved, created_by } = props.discussion;
  return (
    <>
      <BreadCrumb previous="Discussions" current={question} />
      <div className={`card card-body question-${solved}`}>
        <h4>
          <span className={`badge bg-${solved ? "success" : "danger"}`}>
            {solved ? "Solved" : "Unsolved"}
          </span>
        </h4>
        <h3>{question}</h3>
        <h5 className="mb-0 font-weight-light text-muted">
          - <i className="fa fa-user"></i> {getName(created_by)} on{" "}
          {formatDate(submitted_on)}
        </h5>
      </div>
      <ReduxResource
        reducerKey="answer"
        resourceKey="answers"
        render={(answers) => <Answers answers={answers} />}
      />
      {!solved && (
        <PostResponse
          token={props.token}
          id={id}
          isCreator={created_by.username === props.username}
        />
      )}
    </>
  );
};

const mapStateToProps = (state, props) => {
  let id = +props.match.params.id;
  return {
    username: state.auth.details.username,
    discussion: state.discussions.find((q) => q.id === id),
  };
};
const mapDispatchToProps = { fetchAnswers, actionReset };

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionThread);
