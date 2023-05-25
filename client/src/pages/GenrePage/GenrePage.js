import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./GenrePage.css";

const GenrePage = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(9);
  const [mobileList, setMobileList] = useState(false);
  const { id } = useParams();
  const [unauthMsg, setUnauthMsg] = useState("");
  const getGamesByGenre = async () => {
    try {
      const res = await axios.get(`/api/games/browse/${id}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setGames(res.data);
    } catch (error) {
      console.error(error);
      setUnauthMsg(error.response.data.message);
    }
  };

  useEffect(() => {
    getGamesByGenre();
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        setMobileList(true);
      } else {
        setMobileList(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [id]);

  // Pagination
  const totalGames = games.length;
  const totalPages = Math.ceil(totalGames / gamesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the range of games to display on the current page
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div className="genre-page">
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
          {mobileList ? (
            <div className="mobile_games_container">
              <h1>mobile game list</h1>
              <div className="mobile_games_wrapper">
                {currentGames.map((game) => (
                  <Link
                    className="mobile_link"
                    to={`/games/${game.id}`}
                    key={game.id}
                  >
                    <div className="mobile_card">
                      <div
                        className="mobile_pic"
                        style={{
                          backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover.image_id}.jpg)`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <h2>{game.name}</h2>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {" "}
              <h1>Browse Genres</h1>
              <div className="search_container">
                {currentGames.map((game) => (
                  <Link to={`/games/${game.id}`} key={game.id}>
                    <div className="search_card">
                      <h2>{game.name}</h2>
                      <p>Click to view</p>
                      <span></span>
                      <div
                        className="pic"
                        style={{
                          backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover.image_id}.jpg)`,
                        }}
                      ></div>
                      <button></button>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="pagination">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GenrePage;
