import React, { useState, useEffect } from "react";
import "./Library.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Library = () => {
  const [games, setGames] = useState([]);

  const getMyGames = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/users/library/all",
        {
          withCredentials: true,
        }
      );
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyGames();
  }, []);

  return <div>Library</div>;
};

export default Library;
