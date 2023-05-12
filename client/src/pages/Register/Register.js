import React from "react";
import image from "../Login/games.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";
const Register = () => {
  return (
    <div className="login_container">
      <div className="login_left">
        <div className="left_wrapper">
          <h2>Imjord Games</h2>
          <h3>Create Account</h3>
          <form>
            <div class="input-container">
              <input type="text" id="email" required />
              <label for="email" class="placeholder">
                Email
              </label>
            </div>
            <div class="input-container">
              <input type="text" id="username" required />
              <label for="username" class="placeholder">
                Username
              </label>
            </div>
            <div class="input-container">
              <input type="password" id="password" required />
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
