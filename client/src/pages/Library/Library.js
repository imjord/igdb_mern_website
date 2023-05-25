import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../GenrePage/GenrePage.css";

axios.defaults.withCredentials = true;

const Library = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(9);
  const [user, setUser] = useState({});
  const [mobileLibrary, setMobileLibrary] = useState(false);
  const [unauthMsg, setUnauthMsg] = useState("");

  const getMyGames = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/users/library", {
        withCredentials: true,
      });
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.error(error);
      setUnauthMsg(error.response.data.message);
    }
  };

  const removeGame = async (gameId) => {
    try {
      const res = await axios.delete(
        "http://localhost:3001/api/users/library",
        {
          data: { _id: gameId }, // Pass the game ID in the request body
          withCredentials: true, // Include this option
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMyGames();
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        setMobileLibrary(true);
      } else {
        setMobileLibrary(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Pagination
  const totalGames = user.library ? user.library.length : 0;
  const totalPages = Math.ceil(totalGames / gamesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the range of games to display on the current page
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = user.library
    ? user.library.slice(indexOfFirstGame, indexOfLastGame)
    : [];

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
          {mobileLibrary ? (
            <div className="mobile_games_container">
              <h1>{user.username}s Mobile Library</h1>
              <div className="mobile_games_wrapper">
                {currentGames.map((game) => (
                  <div
                    className="mobile_link"
                    to={`/games/${game.id}`}
                    key={game.id}
                  >
                    <div className="mobile_card">
                      <div
                        className="mobile_pic"
                        style={{
                          backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.image_id}.jpg)`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                        }}
                      ></div>
                      <div className="mobile_library_title">
                        {" "}
                        <h2>{game.name}</h2>
                        <button onClick={() => removeGame(game._id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {" "}
              <h1>{user.username} Library</h1>
              <div className="search_container">
                {currentGames.map((game) => (
                  <div>
                    <Link to={`/games/${game.gameId}`} key={game.gameId}>
                      <div className="search_card">
                        <h2>{game.name}</h2>
                        <p>Click to view</p>
                        <span></span>
                        <div
                          className="pic"
                          style={{
                            backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.image_id}.jpg)`,
                          }}
                        ></div>
                        <button></button>
                      </div>
                    </Link>
                    <button onClick={() => removeGame(game._id)}>Remove</button>
                  </div>
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

export default Library;
