import React from "react";
import { withRouter } from "react-router-dom";

const EmptyPage = ({ backButton = false, children, history }) => (
  <div className="text-center my-3">
    <h3>{children}</h3>
    {backButton && (
      <button className="btn btn-warning" onClick={() => history.goBack()}>
        Go Back
      </button>
    )}
  </div>
);

export default withRouter(EmptyPage);
