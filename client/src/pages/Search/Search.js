import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const { name } = useParams();
  const [games, setGames] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(9);
  const getSearchedGames = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/games/search/${name}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setGames(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSearchedGames();
  }, [name]);

  // Pagination
  const totalGames = games.length;
  const totalPages = Math.ceil(totalGames / gamesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the range of games to display on the current page
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <div>
      <div className="search_container">
        {currentGames.map((game) => (
          <Link to={`/games/${game.id}`}>
            <div className="search_card">
              <h2>{game.name}</h2>
              <p>poop</p>
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
  );
};

export default Search;
