import React, { useState, useEffect } from "react";
import "./Browse.css";
import axios from "axios";
import { Link } from "react-router-dom";
const Browse = () => {
  const [genres, setGenres] = useState([]);
  const [unauthMsg, setUnauthMsg] = useState("");

  const getGenres = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/games/browse", {
        withCredentials: true,
      });
      console.log(res.data);
      setGenres(res.data);
    } catch (error) {
      console.error(error);
      setUnauthMsg(error.response.data.message);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <div className="genre_container">
      {unauthMsg ? (
        <div className="error_container">
          <p className="error">
            {unauthMsg}
            <br />
            <Link to="/">Login</Link>
          </p>
        </div>
      ) : (
        <div className="genre_row">
          <h1>Browse Genres</h1>
          {genres.map((genre) => (
            <div className="genre_wrapper" key={genre.id}>
              <div className="genre">
                <div>
                  <Link id="Link" to={`/browse/${genre.id}`}>
                    <h3>{genre.name}</h3>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;
