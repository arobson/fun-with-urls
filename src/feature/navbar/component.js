import "./style.css";
import React from "react";
import { Link, IndexLink } from "react-router";

const NavBar = () => {
  return (
    <div className="navbar">
      <ul className="nav nav-tabs">
        <li role="presentation">
          <IndexLink to="/">
            <i className="fa fa-html5 fa-2x">&nbsp;</i>
            Analyze Page
          </IndexLink>
        </li>
        <li role="presentation">
          <Link to="/about">
          <i className="fa fa-question fa-2x">&nbsp;</i>
            About This Project
          </Link>
        </li>
      </ul>
    </div> 
  );
}

export default NavBar;