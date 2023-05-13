import React, { useState, useEffect } from "react";
import "./TrendingGames.css";
import axios from "axios";
import Carousel from "../Carousel";

const TrendingGames = () => {
  const [trendingGames, setTrendingGames] = useState([]);

  const getTrendingGames = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/games/trending");
      console.log(res.data);
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
      {trendingGames.length > 0 && <Carousel games={trendingGames} />}
    </div>
  );
};

export default TrendingGames;
