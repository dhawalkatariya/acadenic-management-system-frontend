import React, { Component } from "react";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import FormInput from "../components/FormInput";
import { authenticate, authReset } from "../store/actions/auth";
import { validatePassword } from "../common/utils";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      username: "Enter your username.",
      password: "Enter your password.",
    },
    touched: {
      username: false,
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
  handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "Password":
        return this.handlePassword(value);
      case "Username":
        return this.handleUsername(value);
      default:
        return;
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(this.state.errors).every((v) => v === "")) {
      const { username, password } = this.state;
      this.props.authenticate(username, password);
    } else {
      this.setState({ touched: { username: true, password: true } });
    }
  };
  handleReset = () => {
    this.setState({
      username: "",
      password: "",
      errors: {
        username: "Enter your username.",
        password: "Enter your password.",
      },
      touched: {
        username: false,
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
          <h2 className="text-center display-4 mb-3">Sign In</h2>
          <form onSubmit={this.handleSubmit}>
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
              <button type="submit" className="btn btn-primary mr-2 inp-btn">
                Sign In
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

const mapDispatchToProps = { authenticate, authReset };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
