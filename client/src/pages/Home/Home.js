import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TrendingGames from "../../Components/TrendingGames/TrendingGames";
const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // check if user is logged in
    const loggedIn = localStorage.getItem("imjordLoggedIn");
    if (!loggedIn) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <TrendingGames />
    </div>
  );
};

export default Home;
