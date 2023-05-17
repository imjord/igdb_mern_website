import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const NavBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to the search results page with the search query as a parameter
    navigate(`/search/${search}`);
    // Reset the search input
    setSearch("");
  };

  return (
    <nav>
      <div className="logo">
        <h1> Imjord Games</h1>
      </div>
      <div className="explore_container">
        <ul>
          <li>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                id="search_input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Games"
              />
              <button type="submit"></button>
            </form>
          </li>
          <Link id="Link" to="/home">
            {" "}
            <li>Home</li>
          </Link>
          <Link id="Link" to="/browse">
            <li>Browse</li>
          </Link>
        </ul>
      </div>
      <div className="profile_container">
        <ul>
          <Link to="/library">
            {" "}
            <li>Library</li>
          </Link>

          <li>Profile</li>
          <li>Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
