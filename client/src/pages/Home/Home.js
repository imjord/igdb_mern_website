import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TrendingGames from "../../Components/TrendingGames/TrendingGames";
import { AuthContext } from "../../Context/AuthContext";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TrendingGames />
    </div>
  );
};

export default Home;
