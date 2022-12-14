import React, { memo, Component } from "react";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { connect } from "react-redux";
import { postAssignment } from "../store/actions/assignment";
import { actionReset } from "../store/actions/action";

const Question = memo(({ text, setText, i }) => (
  <>
    <label className="form-label font-weight-bold">Question {+i + 1}</label>
    <input
      type="text"
      placeholder="Enter question"
      className="form-control"
      value={text}
      onChange={(e) => setText(i, e.target.value)}
    />
  </>
));

const Choice = memo(({ text, setText, qi, i }) => (
  <div className="input-group">
    <span className="input-group-text">{i}</span>
    <input
      type="text"
      className="form-control"
      value={text}
      placeholder={"Enter choice"}
      onChange={(e) => setText(qi, i, e.target.value)}
    />
  </div>
));

const Answer = memo(({ value, setAnswer, i }) => (
  <div className="input-group">
    <span className="input-group-text">Answer</span>
    <select
      value={value}
      className="form-select"
      onChange={(e) => setAnswer(i, +e.target.value)}
    >
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
  </div>
));

const ActionButtons = memo(
  ({ addQuestion, deleteLastQuestion, postAssignment }) => (
    <div className="btn-group">
      <button className="btn btn-success" onClick={postAssignment}>
        Post
      </button>
      <button className="btn btn-primary" onClick={addQuestion}>
        Add Question
      </button>
      <button className="btn btn-danger" onClick={deleteLastQuestion}>
        Delete Last Question
      </button>
    </div>
  )
);

class PostAssignment extends Component {
  state = {
    title: "",
    questions: { 0: "" },
    choices: [{ c1: "", c2: "", c3: "", c4: "" }],
    answers: { 0: 1 },
    errors: [],
  };
  componentDidMount() {
    this.props.actionReset();
  }
  addQuestion = () => {
    const i = this.state.choices.length;
    this.setState({
      questions: { ...this.state.questions, [i]: "" },
      choices: [...this.state.choices, { c1: "", c2: "", c3: "", c4: "" }],
      answers: { ...this.state.answers, [i]: 1 },
    });
  };
  deleteLastQuestion = () => {
    const i = this.state.choices.length - 1;
    if (i === 0) return;
    const questions = { ...this.state.questions };
    const answers = { ...this.state.answers };
    const choices = this.state.choices.slice(0, i);
    delete questions[i];
    delete answers[i];
    this.setState({ questions, answers, choices });
  };
  postAssignment = () => {
    const errors = [];
    if (!this.state.title) errors.push("Title cannot be empty.");
    const obj = {
      classroom: this.props.id,
      title: this.state.title,
      questions: Object.keys(this.state.questions).map((k) => {
        if (!this.state.questions[k])
          errors.push(`Question ${+k + 1} cannot be empty.`);
        if (Object.values(this.state.choices[+k]).some((v) => !v))
          errors.push(`Choices of question ${+k + 1} cannot be empty.`);
        return {
          text: this.state.questions[k],
          answer: this.state.answers[k],
          ...this.state.choices[+k],
        };
      }),
    };
    if (errors.length === 0) {
      this.setState({ errors: [] });
      this.props.postAssignment(obj);
    } else this.setState({ errors });
  };
  setTitle = (title) => this.setState({ title });
  setChoice = (k1, k, text) => {
    this.setState({
      choices: this.state.choices.map((c, i) => {
        if (i !== +k1) return c;
        return { ...c, [k]: text };
      }),
    });
  };
  setQuestion = (k, text) => {
    this.setState({ questions: { ...this.state.questions, [k]: text } });
  };
  setAnswer = (k, value) => {
    this.setState({ answers: { ...this.state.answers, [k]: value } });
  };
  render() {
    if (this.props.loading) return <Spinner />;
    return (
      <div className="card card-body">
        <h2>Post Assignment</h2>
        {this.props.error && <Message message={this.props.error} />}
        {this.props.success && <Message success message={this.props.success} />}
        <div className="mb-2">
          <label className="form-label font-weight-bold">Title</label>
          <input
            type="text"
            required="required"
            placeholder="Enter title"
            className="form-control"
            value={this.state.title}
            onChange={(e) => this.setTitle(e.target.value)}
          />
        </div>
        {Object.keys(this.state.questions).map((k) => (
          <div className="card card-body my-1" key={k}>
            <Question
              text={this.state.questions[k]}
              setText={this.setQuestion}
              i={k}
            />
            <label className="form-label mt-2">Choices</label>
            {Object.keys(this.state.choices[+k]).map((k1) => (
              <Choice
                key={k1}
                text={this.state.choices[+k][k1]}
                qi={k}
                i={k1}
                setText={this.setChoice}
              />
            ))}
            <Answer
              i={k}
              value={this.state.answers[k]}
              setAnswer={this.setAnswer}
            />
          </div>
        ))}
        {this.state.errors.length > 0 && (
          <Message message={this.state.errors} />
        )}
        <ActionButtons
          postAssignment={this.postAssignment}
          addQuestion={this.addQuestion}
          deleteLastQuestion={this.deleteLastQuestion}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.action.classroom.id,
  token: state.auth.key,
  loading: state.action.loading,
  error: state.action.error,
  success: state.action.success,
});

const mapDispatchToProps = {
  actionReset,
  postAssignment,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostAssignment);
