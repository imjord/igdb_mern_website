import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TrendingGames from "../../Components/TrendingGames/TrendingGames";
import { AuthContext } from "../../Context/AuthContext";
const Home = () => {
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
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
