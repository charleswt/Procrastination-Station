import React from 'react';
import Snake from './Snake';
import Food from './Food';

const GameBoard = ({ snake, food, boardSize }) => {
  const gameBoardStyle = {
    position: 'relative',
    width: `${boardSize * 20}px`,
    height: `${boardSize * 20}px`,
    border: '1px solid black',
    margin: 'auto',
  };

  return (
    <div className="game-board" style={gameBoardStyle}>
      <Snake snake={snake} />
      {food && <Food food={food} />}
    </div>
  );
};

export default GameBoard;