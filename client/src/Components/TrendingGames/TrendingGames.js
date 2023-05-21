import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import Carousel from "../Carousel";
import { Link } from "react-router-dom";

const TrendingGames = () => {
  const [trendingGames, setTrendingGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetchedData, setHasFetchedData] = useState(false); // New state variable
  const [unauthMsg, setUnauthMsg] = useState("");

  const getTrendingGames = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3001/api/games/trending", {
        withCredentials: true,
      });
      console.log("Trending games:");
      console.log(res.data);
      setLoading(false);
      setTrendingGames(res.data);
      setHasFetchedData(true); // Set the flag after fetching the data
    } catch (err) {
      console.log(err);
      setUnauthMsg(err.response.data.message);
    }
  };

  useEffect(() => {
    // Make the initial request only if the data hasn't been fetched before
    if (!hasFetchedData) {
      getTrendingGames();
    }
  }, [hasFetchedData]);

  return (
    <div className="trending">
      {loading ? <Spinner /> : <h1>Trending Games</h1>}
      {unauthMsg ? (
        <div className="error_container">
          <p className="error">
            {unauthMsg}
            <br />
            <Link to="/">Login</Link>
          </p>
        </div>
      ) : null}
      {trendingGames.length > 0 && <Carousel games={trendingGames} />}
    </div>
  );
};

export default TrendingGames;
