import React, { Component, memo } from "react";
import axios from "../common/axios";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import Breadcrumb from "../components/Breadcrumb";
import { formatDate } from "../common/utils";
import { submitAssignment } from "../store/actions/assignment";
import { actionReset } from "../store/actions/action";
import { connect } from "react-redux";

export const Info = memo(({ title, created_on }) => (
  <>
    <h3>{title}</h3>
    <h5>
      <span className="badge bg-warning text-dark">
        Posted - {formatDate(created_on)}
      </span>
    </h5>
  </>
));

export const Question = memo(
  ({ question, setValue, index, disabled = false }) => (
    <div className="card card-body mb-2 shadow-sm">
      <h5>Q-{index + 1 + ") " + question.text}</h5>
      <Choice
        id={index}
        text={question.c1}
        value={1}
        disabled={disabled}
        setValue={setValue}
      />
      <Choice
        id={index}
        text={question.c2}
        value={2}
        disabled={disabled}
        setValue={setValue}
      />
      <Choice
        id={index}
        text={question.c3}
        value={3}
        disabled={disabled}
        setValue={setValue}
      />
      <Choice
        id={index}
        text={question.c4}
        value={4}
        disabled={disabled}
        setValue={setValue}
      />
    </div>
  )
);

export const Choice = memo(({ id, text, value, setValue, disabled }) => (
  <div className="form-check">
    <input
      required
      type="radio"
      id={`c${id}${value}`}
      disabled={disabled}
      value={value}
      name={id}
      className="form-check-input"
      onChange={(e) => setValue(id, e.target.value)}
    />
    <label htmlFor={`c${id}${value}`} className="text-dark">
      {text}
    </label>
  </div>
));

const ActionButtons = memo(() => (
  <>
    <button type="submit" className="btn btn-success mr-2">
      Submit
    </button>
    <button type="reset" className="btn btn-danger">
      Reset
    </button>
  </>
));

class SubmitAssignment extends Component {
  state = {
    answers: {},
    loading: true,
    error: null,
    assignment: null,
  };
  componentDidMount() {
    this.props.actionReset();
    axios
      .get(`assignment/${this.props.match.params.id}/`, {
        headers: { Authorization: `Token ${this.props.token}` },
      })
      .then((res) => this.setState({ loading: false, assignment: res.data }))
      .catch((err) =>
        this.setState({ loading: false, error: "Error fetching assignment." })
      );
  }
  componentWillUnmount() {
    this.props.actionReset();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.assignment.questions.length ===
      Object.values(this.state.answers).length
    )
      this.props.submitAssignment(
        this.props.match.params.id,
        Object.values(this.state.answers),
        () => this.props.history.goBack()
      );
  };
  setValue = (index, value) => {
    this.setState({ answers: { ...this.state.answers, [index]: value } });
  };
  render() {
    if (this.props.loading || this.state.loading) return <Spinner />;
    if (this.state.error) return <Message message={this.state.error} />;
    const { title, questions, created_on } = this.state.assignment;
    return (
      <>
        <Breadcrumb previous="Assignments" current={title} />
        <div className="card card-body">
          <Info title={title} created_on={created_on} />
          {this.props.error && <Message message={this.props.error} />}
          <form onSubmit={this.handleSubmit}>
            {questions.map((question, index) => (
              <Question
                index={index}
                question={question}
                key={question.id}
                setValue={this.setValue}
              />
            ))}
            <ActionButtons />
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.key,
  loading: state.action.loading,
  error: state.action.error,
});

const mapDispatchToProps = {
  actionReset,
  submitAssignment,
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitAssignment);
