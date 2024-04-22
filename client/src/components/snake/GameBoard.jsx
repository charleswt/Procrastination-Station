import React from 'react';
import Snake from './Snake';
import Food from './Food';

const GameBoard = ({ snake, food, boardSize }) => {
  const gameBoardStyle = {
    position: 'relative',
    width: `${boardSize * 20}px`,
    height: `${boardSize * 20}px`,
    border: '2px solid black',
    margin: 'auto',
    borderRadius: '4px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
  };

  return (
    <div className="game-board" style={gameBoardStyle}>
      <Snake snake={snake} />
      {food && <Food food={food} />}
    </div>
  );
};

export default GameBoard;
