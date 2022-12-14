import React from "react";
import { Link, NavLink } from "react-router-dom";
import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/actions/auth";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.auth.details);
  let items = (
    <>
      <li className="nav-item">
        <NavLink to="/sign_in" className="nav-link">
          <i className="fa fa-sign-in fa-lg"></i> Sign In
        </NavLink>
      </li>
      <li className="nav_item">
        <NavLink className="nav-link" to="/sign_up">
          <i className="fa fa-user-plus fa-lg"></i> Sign Up
        </NavLink>
      </li>
    </>
  );
  if (details) {
    items = (
      <li className="nav-item dropdown">
        <p className="nav-link mb-0 dropdown-toggle" data-toggle="dropdown">
          <i className="fa fa-user fa-lg"></i> {details.username}
        </p>
        <div className="dropdown-menu">
          <NavLink to="/profile" className="dropdown-item">
            Profile
          </NavLink>
          <NavLink to="/password/change" className="dropdown-item">
            Change Password
          </NavLink>
          <p
            className="dropdown-item mb-0"
            onClick={() => {
              dispatch(logOut());
            }}
          >
            Logout
          </p>
        </div>
      </li>
    );
  }
  return (
    <nav
      className="navbar bg-navbar navbar-dark navbar-expand-md"
      style={{ boxShadow: "0 0 10px 3px rgba(0,0,0,.4)" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/sign-in">
          <i className="fa fa-book"></i> E Study
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navigation">
          <ul className="navbar-nav">
            {details && (
              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link">
                  <i className="fa fa-dashboard fa-lg"></i> Dashboard
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">{items}</ul>
        </div>
      </div>
    </nav>
  );
};
export default memo(Navbar);
