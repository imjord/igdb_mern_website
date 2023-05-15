import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      NotFound
      <Link id="Link" to="/home">
        Home
      </Link>
    </div>
  );
};

export default NotFound;
