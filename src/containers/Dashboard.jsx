import React, { memo } from "react";
import RenderClass from "../components/RenderClass";
import Options from "../components/Options";
import TabNavigation from "../components/TabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getActiveClasses, getJoinedClasses } from "../store/actions/classroom";
import { Route, Switch, Redirect } from "react-router-dom";
import { resetClassroom } from "../store/actions/action";

const Navigation = memo(() => (
  <TabNavigation
    links={[
      { url: "/dashboard/created", label: "Created" },
      { url: "/dashboard/joined", label: "Joined" },
    ]}
    className="mt-3"
  />
));

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => !state.joined || !state.created);
  useEffect(() => {
    if (data) dispatch(getActiveClasses(() => dispatch(getJoinedClasses())));
    dispatch(resetClassroom(null));
  }, []);
  return (
    <div className="row">
      <div className="col-12 col-md-5 col-lg-4 col-xl-3">
        <div className="sticky-top">
          <h3 className="my-3">Options</h3>
          <Options />
        </div>
      </div>
      <div className="col-12 col-md-7 col-lg-8 col-xl-9">
        <Navigation />
        <Switch>
          <Route path="/dashboard/created" component={RenderClass} />
          <Route
            path="/dashboard/joined"
            render={() => <RenderClass type="joined" created={false} />}
          />
          <Redirect to="/dashboard/created" />
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
