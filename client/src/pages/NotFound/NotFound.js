import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-animation">
      <div className="animated-text">404</div>
      <div className="animated-subtext">Page Not Found</div>
      <div className="animated-image"></div>
      <Link to="/" className="home-link">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
