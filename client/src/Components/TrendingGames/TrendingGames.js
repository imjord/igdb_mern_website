import React, { useState, useEffect } from "react";
import "./TrendingGames.css";
import axios from "axios";
import Carousel from "../Carousel";
import Spinner from "../Spinner/Spinner";

const TrendingGames = () => {
  const [trendingGames, setTrendingGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTrendingGames = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3001/api/games/trending", {
        withCredentials: true,
      });
      console.log(res.data);
      setLoading(false);
      setTrendingGames(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTrendingGames();
  }, []);
  return (
    <div className="trending">
      {loading ? <Spinner /> : <h1>Trending Games</h1>}
      {trendingGames.length > 0 && <Carousel games={trendingGames} />}
    </div>
  );
};

export default TrendingGames;
