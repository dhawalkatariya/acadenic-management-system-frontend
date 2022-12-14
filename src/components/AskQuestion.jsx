import React, { useState } from "react";
import Spinner from "./Spinner";
import Message from "./Message";
import { askQuestion } from "../store/actions/discussion";
import { actionReset } from "../store/actions/action";
import { connect } from "react-redux";
import { useEffect } from "react";

const AskQuestion = (props) => {
  useEffect(() => {
    props.actionReset();
  }, []);
  const [question, setQuestion] = useState("");
  if (props.loading) return <Spinner />;
  return (
    <>
      <div className="card card-body mb-2">
        <div className="input-group">
          <input
            type="text"
            value={question}
            className="form-control"
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
          />
          <button
            className="btn btn-url"
            disabled={!question}
            onClick={() => props.askQuestion(props.id, question, props.token)}
          >
            Ask Question
          </button>
        </div>
      </div>
      {props.error && <Message message={props.error} />}
      {props.success && <Message success message={props.success} />}
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.key,
  loading: state.action.loading,
  error: state.action.error,
  success: state.action.success,
});

const mapDispatchToProps = {
  askQuestion,
  actionReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(AskQuestion);
