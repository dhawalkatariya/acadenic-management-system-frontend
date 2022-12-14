import React from "react";
import { NavLink } from "react-router-dom";

const TabNavigation = ({
  links,
  type = "tabs",
  vertical = false,
  className = "",
}) => (
  <ul
    className={`nav nav-${type} ${className} ${
      vertical
        ? "flex-row flex-lg-column justify-content-center flex-lg-fill"
        : ""
    }`}
  >
    {links.map((link) => (
      <li className="nav-item" key={link.url}>
        <NavLink to={link.url} className="nav-link">
          {link.icon && <i className={"fa mr-2 fa-lg fa-" + link.icon}></i>}{" "}
          {link.label}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default React.memo(TabNavigation);
