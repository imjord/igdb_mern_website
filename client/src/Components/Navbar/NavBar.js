import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav>
      <div className="logo">
        <h1>Imjord Games</h1>
      </div>
      <div className="explore_container">
        <ul>
          <li>
            <input type="text" id="search_input" placeholder="Search Games" />
          </li>
          <Link to="/home">
            {" "}
            <li>Home</li>
          </Link>
          <Link to="/browse">
            <li>Browse</li>
          </Link>

          <li>News</li>
        </ul>
      </div>
      <div className="profile_container">
        <ul>
          <li>Library</li>
          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
