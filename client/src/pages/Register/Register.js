import React, { useState, useEffect, useContext } from "react";
import image from "../Login/games.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
const Register = () => {
  const { toggleLoggedIn } = useContext(AuthContext);
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
      const res = await axios.post(
        "/api/users",
        {
          email,
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // set logged in to true
      toggleLoggedIn();
      // redirect to home page
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="login_container">
      <div className="login_left">
        <div className="left_wrapper">
          <h2> imjord Games</h2>
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
            <p>made with &#10084; imjord</p>
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
