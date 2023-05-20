import React, { useState, useEffect, useContext } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
const NavBar = () => {
  const [search, setSearch] = useState("");
  const { loggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3001/api/auth/logout", {
        withCredentials: true,
      });
      // set logged in to false
      logout();
      // redirect to home page
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirect to the search results page with the search query as a parameter
    navigate(`/search/${search}`);
    // Reset the search input
    setSearch("");
  };

  useEffect(() => {
    // check if user is logged in
    if (!loggedIn) {
      navigate("/");
    }
  }, []);

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
          <li onClick={() => handleLogout()}>Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
