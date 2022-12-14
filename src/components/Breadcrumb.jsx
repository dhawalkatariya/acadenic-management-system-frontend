import React from "react";
import { withRouter } from "react-router-dom";

const BreadCrumb = (props) => (
  <ol className="breadcrumb flex-nowrap mb-2">
    <li className="breadcrumb-item">
      <span className="text-primary span-a" onClick={props.history.goBack}>
        {props.previous}
      </span>
    </li>
    <li className="breadcrumb-item active text-truncate d-inline-block">
      {props.current}
    </li>
  </ol>
);

export default withRouter(BreadCrumb);
