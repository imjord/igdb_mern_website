import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
  }, []);

  // Pagination
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="genre-page">
      <h1>Browse Genres</h1>
      <div className="game-list">
        {currentGames.map((game) => (
          <div className="game-card" key={game.id}>
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            {/* Add any other game details you want to display */}
          </div>
        ))}
      </div>
      <div className="pagination">
        {games.map((game, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
