import React, { Component } from "react";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import FormInput from "../components/FormInput";
import { signUp, authReset } from "../store/actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { validateEmail, validatePassword } from "../common/utils";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    errors: {
      username: "Enter your username.",
      email: "Enter your email address.",
      password: "Enter your password.",
    },
    touched: {
      username: false,
      email: false,
      password: false,
    },
  };
  componentDidMount() {
    this.props.authReset();
  }
  setTouched = (e) => {
    const name = e.target.name.toLowerCase();
    this.setState({ touched: { ...this.state.touched, [name]: true } });
  };
  handlePassword = (value) => {
    const error = validatePassword(value);
    let errors = { ...this.state.errors, password: error };
    this.setState({ password: value, errors: errors });
  };
  handleUsername = (value) => {
    let error = "";
    if (!value) error = "Enter your username.";
    let errors = { ...this.state.errors, username: error };
    this.setState({ username: value, errors: errors });
  };
  handleEmail = (value) => {
    const error = validateEmail(value);
    let errors = { ...this.state.errors, email: error };
    this.setState({ email: value, errors: errors });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "Password":
        return this.handlePassword(value);
      case "Email":
        return this.handleEmail(value);
      case "Username":
        return this.handleUsername(value);
      default:
        return;
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(this.state.errors).every((v) => v === "")) {
      const { email, username, password } = this.state;
      this.props.signUp(email, username, password);
    } else {
      this.setState({
        touched: { username: true, email: true, password: true },
      });
    }
  };
  handleReset = () => {
    this.setState({
      username: "",
      email: "",
      password: "",
      errors: {
        username: "Enter your username.",
        email: "Enter your email address.",
        password: "Enter your password.",
      },
      touched: {
        username: false,
        email: false,
        password: false,
      },
    });
  };
  render() {
    if (this.props.loading) return <Spinner />;
    if (this.props.token) return <Redirect to="/dashboard" />;
    return (
      <div
        style={{ minHeight: "calc(100vh - 56px)" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="card card-body shadow-lg" style={{ maxWidth: "500px" }}>
          <h2 className="text-center display-4 mb-3">Sign Up</h2>
          <form onSubmit={this.handleSubmit}>
            <FormInput
              type="email"
              label="Email"
              placeholder="Enter your email"
              value={this.state.email}
              error={this.state.errors.email}
              touched={this.state.touched.email}
              onChange={this.handleChange}
              {...(this.state.touched.email ? {} : { onBlur: this.setTouched })}
            />
            <FormInput
              type="text"
              label="Username"
              placeholder="Enter your username"
              value={this.state.username}
              error={this.state.errors.username}
              touched={this.state.touched.username}
              onChange={this.handleChange}
              {...(this.state.touched.username
                ? {}
                : { onBlur: this.setTouched })}
            />
            <FormInput
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={this.state.password}
              error={this.state.errors.password}
              touched={this.state.touched.password}
              onChange={this.handleChange}
              {...(this.state.touched.password
                ? {}
                : { onBlur: this.setTouched })}
            />
            {this.props.error && <Message message={this.props.error} />}
            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-success mr-2 inp-btn">
                Sign Up
              </button>
              <button
                type="reset"
                className="btn btn-danger inp-btn"
                onClick={this.handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.key,
  loading: state.action.loading,
  error: state.action.error,
});

const mapDispatchToProps = { signUp, authReset };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
