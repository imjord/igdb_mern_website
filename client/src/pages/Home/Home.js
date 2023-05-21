import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TrendingGames from "../../Components/TrendingGames/TrendingGames";
import { AuthContext } from "../../Context/AuthContext";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {}, []);
  return (
    <div>
      <TrendingGames />
    </div>
  );
};

export default Home;
