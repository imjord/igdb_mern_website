import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Game.css";

const Game = () => {
  const [game, setGame] = useState({});
  const { id } = useParams();
  const [unauthMsg, setUnauthMsg] = useState("");
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");

  const addGameToLibrary = async () => {
    try {
      const res = await axios.post(
        `/api/users/library`,
        {
          name: game.name,
          image_id: game.cover.image_id,
          gameId: game.id,
        },
        { withCredentials: true }
      );
      console.log(res.data);
      setAddSuccess(res.data.message);
    } catch (error) {
      console.error(error);
      setAddError(error.response.data.message);
    }
  };

  useEffect(() => {
    const getGame = async () => {
      try {
        const res = await axios.get(`/api/games/${id}`, {
          withCredentials: true,
        });
        console.log(res.data);
        setGame(res.data[0] || {});
      } catch (error) {
        console.error(error);
        setUnauthMsg(error.response.data.message);
      }
    };

    getGame();
  }, [id]);

  if (addSuccess) setTimeout(() => setAddSuccess(""), 3000);
  if (addError) setTimeout(() => setAddError(""), 3000);

  if (typeof game === "undefined" || game === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="single-game-container">
      {unauthMsg ? (
        <div className="error_container">
          <p className="error">
            {unauthMsg}
            <br />
            <Link to="/">Login</Link>
          </p>
        </div>
      ) : (
        <div className="single-game-card">
          <div className="game_title">
            <h2>{game.name || "N/A"}</h2>
            {addSuccess ? <p className="success">{addSuccess}</p> : null}
            {addError ? <p className="error">{addError}</p> : null}
            <button onClick={() => addGameToLibrary()}>add to library</button>
          </div>
          <p>{game.summary || "N/A"}</p>
          <div className="screenshots">
            <h3>Screenshots</h3>
            {game.screenshots && game.screenshots.length > 0 ? (
              game.screenshots.map((screenshot) => (
                <img
                  key={screenshot.id}
                  src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/${screenshot.image_id}.jpg`}
                  alt="Screenshot"
                />
              ))
            ) : (
              <p>No screenshots available</p>
            )}
          </div>
          <div className="platforms">
            <h3>Platforms</h3>
            <ul>
              {game.platforms && game.platforms.length > 0 ? (
                game.platforms.map((platform) => (
                  <li key={platform.id}>{`Platform ${platform.name}`}</li>
                ))
              ) : (
                <p>No platforms available yet</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
