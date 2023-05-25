import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import Carousel from "../Carousel";
import { Link } from "react-router-dom";
import MobileCarousel from "../MobileCarousel";

const TrendingGames = () => {
  const [trendingGames, setTrendingGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [unauthMsg, setUnauthMsg] = useState("");
  const [mobileHome, setMobileHome] = useState(false);

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
      setHasFetchedData(true);
    } catch (err) {
      console.log(err);
      setUnauthMsg(err.response.data.message);
    }
  };

  useEffect(() => {
    if (!hasFetchedData) {
      getTrendingGames();
    }
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        setMobileHome(true);
      } else {
        setMobileHome(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hasFetchedData]);

  return (
    <div className="trending">
      {unauthMsg ? (
        <div className="error_container">
          <p className="error">
            {unauthMsg}
            <br />
            <Link to="/">Login</Link>
          </p>
        </div>
      ) : (
        <div>
          {mobileHome ? (
            <div>
              {trendingGames.length > 0 && (
                <MobileCarousel games={trendingGames} />
              )}
            </div>
          ) : (
            <div>
              {trendingGames.length > 0 && <Carousel games={trendingGames} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendingGames;
