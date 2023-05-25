import React, { useState } from "react";

const MobileCarousel = ({ games }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(games);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === games.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return games.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  return (
    <div className="mobile-carousel">
      <h2>Games Trending Now.</h2>
      {games.length > 0 && (
        <div className="mobile-carousel-item">
          <img
            src={games[currentIndex].cover.url}
            alt={games[currentIndex].name}
            className="game-image"
          />
          <h3 className="game-title">{games[currentIndex].name}</h3>
          <a href={`/games/${games[currentIndex].id}`} className="game-button">
            View Game
          </a>
        </div>
      )}
      {games.length > 1 && (
        <div>
          <button onClick={handlePrev}>Prev</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
};

export default MobileCarousel;
