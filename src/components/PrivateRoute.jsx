import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ activate, redirect = "/sign_in", ...rest }) => {
  if (activate) return <Route {...rest} />;
  return <Redirect to={redirect} />;
};

export default PrivateRoute;
