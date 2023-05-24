import React, { useState, useEffect, useContext } from "react";
import "./NavBar.css";
import { Link, useNavigate, useMatch } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBars,
  faHouseChimney,
  faNewspaper,
  faBookmark,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const home = useMatch("/home");
  const browse = useMatch("/browse");
  const library = useMatch("/library");
  const searchRoute = useMatch("/search/:search");
  const browseGenre = useMatch("/browse/:genre");
  const [search, setSearch] = useState("");
  const [topNav, setTopNav] = useState(false);
  const { logout, toggleLoggedIn, navBar, setNavBar } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3001/api/auth/logout", {
        withCredentials: true,
      });
      // set logged in to false
      logout();
      setNavBar(false);
      // redirect to home page
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
    setSearch("");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        setTopNav(true);
      } else {
        setTopNav(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav>
      {topNav && home?.pathname ? (
        <div className="mobile_search_div">
          {" "}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              id="mobile_search_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Games"
            />
          </form>
        </div>
      ) : null}
      {topNav && browse?.pathname ? <h1>Browse</h1> : null}
      {topNav && library?.pathname ? <h1>Library</h1> : null}
      {topNav && searchRoute?.pathname ? (
        <div className="mobile_search_div">
          {" "}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              id="mobile_search_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Games"
            />
          </form>
        </div>
      ) : null}
      {topNav && browseGenre?.pathname ? (
        <div className="mobile_search_div">
          {" "}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              id="mobile_search_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Games"
            />
          </form>
        </div>
      ) : null}
      <div className="desktop_navbar">
        <div className="logo">
          <Link id="title_logo" to="/home">
            <h1>imjord Games</h1>{" "}
          </Link>
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
              </form>
            </li>
            <Link id="Link" to="/home">
              <li>Home</li>
            </Link>
            <Link id="Link" to="/browse">
              <li>Browse</li>
            </Link>
          </ul>
        </div>
        <div className="profile_container">
          <ul>
            <Link id="Link" to="/library">
              <li>Library</li>
            </Link>
            <li id="Link" onClick={() => handleLogout()}>
              Logout
            </li>
          </ul>
        </div>
      </div>
      <div className="mobile_navbar show">
        <ul className="mobile_icons">
          <Link id="Link" to="/home">
            <li>
              <FontAwesomeIcon className="mobile_icon" icon={faHouseChimney} />
            </li>
          </Link>
          <Link id="Link" to="/browse">
            <li>
              <FontAwesomeIcon className="mobile_icon" icon={faNewspaper} />
            </li>
          </Link>
          <Link id="Link" to="/library">
            <li>
              <FontAwesomeIcon className="mobile_icon" icon={faBookmark} />
            </li>
          </Link>
          <li id="Link" onClick={() => handleLogout()}>
            <FontAwesomeIcon className="mobile_icon" icon={faDoorOpen} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
