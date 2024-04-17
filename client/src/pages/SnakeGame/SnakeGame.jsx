import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';

const SnakeGame = () => {
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState(null);
  const [foodGenerated, setFoodGenerated] = useState(false);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const BOARD_SIZE = 15;
  const SPEED = 100;

  useEffect(() => {
    if (gameStarted && !gameOver) {
      if (!foodGenerated) {
        generateFood();
        setFoodGenerated(true);
      }

      const intervalId = setInterval(() => {
        moveSnake();
      }, SPEED);

      return () => clearInterval(intervalId);
    }
  }, [foodGenerated, snake, direction, gameStarted, gameOver]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      handleDirectionChange(key);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction]);

  const generateFood = () => {
    const randomPosition = () => Math.floor(Math.random() * BOARD_SIZE);
    const newFood = [randomPosition(), randomPosition()];
    setFood(newFood);
  };

  const moveSnake = () => {
    const head = snake[0];
    let newHead;

    switch (direction) {
      case 'RIGHT':
        newHead = [head[0] + 1, head[1]];
        break;
      case 'LEFT':
        newHead = [head[0] - 1, head[1]];
        break;
      case 'UP':
        newHead = [head[0], head[1] - 1];
        break;
      case 'DOWN':
        newHead = [head[0], head[1] + 1];
        break;
      default:
        return;
    }

    if (
      newHead[0] < 0 ||
      newHead[0] >= BOARD_SIZE ||
      newHead[1] < 0 ||
      newHead[1] >= BOARD_SIZE ||
      snake.some(segment => segment[0] === newHead[0] && segment[1] === newHead[1])
    ) {
      setGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setScore(prevScore => prevScore + 1);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const handleDirectionChange = (newDirection) => {
    switch (newDirection) {
      case 'ArrowUp':
      case 'UP':
        if (direction !== 'DOWN') {
          setDirection('UP');
        }
        break;
      case 'ArrowDown':
      case 'DOWN':
        if (direction !== 'UP') {
          setDirection('DOWN');
        }
        break;
      case 'ArrowLeft':
      case 'LEFT':
        if (direction !== 'RIGHT') {
          setDirection('LEFT');
        }
        break;
      case 'ArrowRight':
      case 'RIGHT':
        if (direction !== 'LEFT') {
          setDirection('RIGHT');
        }
        break;
      default:
        break;
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setSnake([[0, 0]]);
    setDirection('RIGHT');
    setFood(null);
    setFoodGenerated(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>Snake Game</h2>
        {!gameStarted ? (
          <button onClick={startGame}>Start Game</button>
        ) : (
          <>
            <GameBoard snake={snake} food={food} boardSize={BOARD_SIZE} />
            <div className="score">Score: {score}</div>
            {gameOver ? (
              <div>
                <div className="game-over">Game Over!</div>
                <button onClick={startGame}>Restart Game</button>
              </div>
            ) : (
              <div className="direction-buttons">
                <button onClick={() => handleDirectionChange('UP')}>Up</button>
                <button onClick={() => handleDirectionChange('DOWN')}>Down</button>
                <button onClick={() => handleDirectionChange('LEFT')}>Left</button>
                <button onClick={() => handleDirectionChange('RIGHT')}>Right</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;