import React, { useEffect, useState, useContext } from "react";
import image from "./games.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
const Login = () => {
  const { toggleLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    login();
  };

  const login = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      // set logged in to true
      toggleLoggedIn();
      // redirect to home page
      navigate("/home");
    } catch (error) {
      console.error(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="login_container">
      <div className="login_left">
        <div className="left_wrapper">
          <h2> Games</h2>
          {error ? <p className="error">{error}</p> : <h3>Sign in</h3>}
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                required
              />
              <label htmlFor="username" className="placeholder">
                Username
              </label>
            </div>
            <div className="input-container">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                required
              />
              <label htmlFor="password" className="placeholder">
                Password
              </label>
            </div>
            <button id="login_btn" type="submit">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
          <div className="login_links">
            <Link to="/">Forgot password?</Link>
            <Link to="/register">Create account</Link>
          </div>
          <div className="login_footer">
            <p>made with &#10084; </p>
          </div>
        </div>
      </div>
      <div className="login_right">
        <img src={image} alt="games" />
      </div>
    </div>
  );
};

export default Login;
