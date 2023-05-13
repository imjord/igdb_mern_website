import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";

const Carousel = (props) => {
  const { games } = props;
  console.log(games);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [nextGameIndex, setNextGameIndex] = useState(
    (currentGameIndex + 1) % games.length
  );
  const timerRef = useRef(null);

  const createGameCardJSX = (game) => {
    return (
      <div
        className="trending_left_content"
        style={{
          backgroundImage: `url(${game.cover.url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        <h2>{game.name}</h2>
      </div>
    );
  };

  const handleNextGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex + 1) % games.length);
    setNextGameIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  const handleGameCardClick = (index) => {
    setCurrentGameIndex(index);
    setNextGameIndex((index + 1) % games.length);
    clearInterval(timerRef.current);
    startTimer();
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      handleNextGame();
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="container">
      <div className="big-card" onClick={handleNextGame}>
        {createGameCardJSX(games[currentGameIndex])}
      </div>
      <div className="column">
        {games.map(
          (game, index) =>
            index !== currentGameIndex && (
              <div
                className={`game-card ${
                  index === nextGameIndex ? "next-game" : ""
                }`}
                key={index}
                onClick={() => handleGameCardClick(index)}
              >
                {createGameCardJSX(game)}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Carousel;
