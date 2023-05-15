import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./GenrePage.css";

const GenrePage = () => {
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(9);
  const { id } = useParams();

  const getGamesByGenre = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/games/browse/${id}`
      );
      console.log(res.data);
      setGames(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getGamesByGenre();
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
      <h1>Browse Genres</h1>
      <div className="game-list">
        {currentGames.map((game) => (
          <Link id="Link" to={`/games/${game.id}`}>
            <div className="game-card" key={game.id}>
              <h2>{game.name}</h2>
              <p>{game.description}</p>
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

export default GenrePage;
