import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import GameBoard from '../components/snake/GameBoard';
import { UPDATE_SNAKE } from '../utils/mutations';
import { GET_ME } from '../utils/queries';

const SnakeGame = () => {
  const [snake, setSnake] = useState([[0, 0]]);
  const [food, setFood] = useState(null);
  const [foodGenerated, setFoodGenerated] = useState(false);
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const [updateSnake] = useMutation(UPDATE_SNAKE);
  const { loading, error, data, refetch } = useQuery(GET_ME);

  const BOARD_SIZE = 24;
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

  useEffect(() => {
    if (gameOver) {
      updateSnakeScore();
    }
  }, [gameOver]);

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

  const updateSnakeScore = async () => {
    try {
      await updateSnake({
        variables: {
          lastGamesScore: score,
        },
        refetchQueries: [{ query: GET_ME }],
      });
    } catch (error) {
      console.error('Failed to update Snake score:', error);
    }
  };

  const isLoggedIn = !!data && !!data.getMe;

  const centeredStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };
  
  const titleContainerStyle = {
    textAlign: 'center',
  };
  
  const titleStyle = {
    fontSize: '2em',
  };
  
  const scoreBoardStyle = {
    border: '1px solid black',
    backgroundColor: '#4682B4',
    borderRadius: '4px',
    padding: '10px',
    position: 'relative',
  };
  
  const iconContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  };
  
  const arrowButtonStyle = {
    margin: '5px',
    borderRadius: '50%',
    padding: '10px',
    border: '2px solid black',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.7)',
  };
  
  const leftArrowButtonStyle = {
    ...arrowButtonStyle,
    marginRight: '50px',
  };
  
  return (
    <div style={centeredStyle}>
      <div style={titleContainerStyle}>
        <h2 style={titleStyle}>Snake Game</h2>
        {!gameStarted ? (
          <button onClick={startGame}>Start Game</button>
        ) : (
          <>
            {gameOver && (
              <div>
                <div className="game-over">Game Over!</div>
                <button onClick={startGame}>Restart Game</button>
              </div>
            )}
            <div>
            <GameBoard snake={snake} food={food} boardSize={BOARD_SIZE} />
            <div style={scoreBoardStyle}>
              <div className="score">Score: {score}</div>
              {isLoggedIn && <div className="high-score">High Score: {data.getMe.snake}</div>}
            </div>
            </div>
            <div style={iconContainerStyle}>
              <button style={{ ...arrowButtonStyle, borderColor: 'green' }} onClick={() => handleDirectionChange('UP')}>
                <FontAwesomeIcon icon={faArrowUp} size="2x" />
              </button>
              <div style={{ display: 'flex' }}>
                <button style={{ ...arrowButtonStyle, ...leftArrowButtonStyle, borderColor: '#FF69F8' }} onClick={() => handleDirectionChange('LEFT')}>
                  <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                </button>
                <button style={{ ...arrowButtonStyle, borderColor: 'red' }} onClick={() => handleDirectionChange('RIGHT')}>
                  <FontAwesomeIcon icon={faArrowRight} size="2x" />
                </button>
              </div>
              <button style={{ ...arrowButtonStyle, borderColor: 'blue' }} onClick={() => handleDirectionChange('DOWN')}>
                <FontAwesomeIcon icon={faArrowDown} size="2x" />
              </button>
            </div>
  
            {!isLoggedIn && (
              <p>Please login or signup to keep track of high scores</p>
            )}
          </>
        )}
      </div>
    </div>
  );
  



};

export default SnakeGame;
