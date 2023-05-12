import React from "react";
import image from "./games.png";
import "./Login.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const Login = () => {
  return (
    <div className="login_container">
      <div className="login_left">
        <div className="left_wrapper">
          <h2>Imjord Games</h2>
          <h3>Sign in</h3>
          <form>
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
            <Link to="/">Forgot password?</Link>
            <Link to="/register">Create account</Link>
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

export default Login;
