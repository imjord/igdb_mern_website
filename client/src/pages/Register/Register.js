import React, { useState, useEffect } from "react";
import image from "../Login/games.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";
import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    createAccount();
  };

  const createAccount = async () => {
    try {
      const res = await axios.post("http://localhost:3001/api/users", {
        email,
        username,
        password,
      });
      console.log(res);
      // set loggedIn to localStorage
      localStorage.setItem("imjordLoggedIn", true);
      // redirect to home page
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // check if user is logged in
    const loggedIn = localStorage.getItem("imjordLoggedIn");
    if (loggedIn) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="login_container">
      <div className="login_left">
        <div className="left_wrapper">
          <h2>Imjord Games</h2>
          <h3>Create Account</h3>
          <form onSubmit={handleSubmit}>
            <div class="input-container">
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                required
              />
              <label for="email" class="placeholder">
                Email
              </label>
            </div>
            <div class="input-container">
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                required
              />
              <label for="username" class="placeholder">
                Username
              </label>
            </div>
            <div class="input-container">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                required
              />
              <label for="password" class="placeholder">
                Password
              </label>
            </div>
            <button id="login_btn" type="submit">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
          <div className="login_links">
            <Link to="/">Sign in</Link>
          </div>
          <div className="login_footer">
            <p>made with &#10084; Imjord</p>
          </div>
        </div>
      </div>
      <div className="login_right">
        <img src={image} alt="games" />
      </div>
    </div>
  );
};

export default Register;
