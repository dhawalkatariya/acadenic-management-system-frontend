import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import SignUp from "./containers/SignUp";
import SignIn from "./containers/SignIn";
import Profile from "./containers/Profile";
import Dashboard from "./containers/Dashboard";
import Classroom from "./containers/Classroom";
import ChangePassword from "./containers/ChangePassword";
import { useSelector } from "react-redux";

const App = () => {
  const isSignedIn = useSelector((state) => state.auth.key != null);
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/sign_in" component={SignIn} />
          <Route path="/sign_up" component={SignUp} />
          <PrivateRoute
            path="/dashboard"
            component={Dashboard}
            activate={isSignedIn}
          />
          <PrivateRoute
            path="/profile"
            component={Profile}
            activate={isSignedIn}
          />
          <PrivateRoute
            path="/classroom/:code"
            component={Classroom}
            activate={isSignedIn}
          />
          <PrivateRoute
            path="/password/change"
            component={ChangePassword}
            activate={isSignedIn}
          />
          <Redirect to="/dashboard/created" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
