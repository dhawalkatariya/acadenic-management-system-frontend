import React from "react";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import Message from "./Message";

const ReduxResource = (props) => {
  if (props.error) return <Message message={props.error} />;
  if (props.loading || !props.resource) return <Spinner />;
  return props.render(props.resource);
};

const mapStateToProps = (state, props) => {
  return {
    loading: state.action.loading,
    error: state.action.error,
    resource: state[props.resourceKey],
  };
};

export default connect(mapStateToProps)(ReduxResource);
