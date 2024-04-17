import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_TTT }  from '../utils/mutations';
import { GET_ME }  from '../utils/queries';
import '../../public/css/style.css';

export default function TTT() {
  const [updateTtt] = useMutation(UPDATE_TTT);
  const { loading, data } = useQuery(GET_ME);
  const [loadingText, setLoadingText] = useState('Loading');
  const [loadCount, setLoadCount] = useState(0);

    useEffect(() => {
      let interval;
      if (loading) {
        interval = setInterval(() => {
          setLoadCount(prevCount => prevCount + 1);
        }, 400)
      }
    }, [loading]);
  
    useEffect(() => {
      if (!loading && data) {
        document.querySelector('#ttt-score').innerHTML = data.getMe.ttt;
      } else if (loadCount === 5) {
        document.querySelector('#ttt-score').innerHTML = "Please Login/Signup to keep track of scores.";
      } else {
        switch (loadCount) {
          case 0:
            setLoadingText('Loading');
            break;
          case 1:
            setLoadingText('Loading.');
            break;
          case 2:
            setLoadingText('Loading..');
            break;
          case 3:
            setLoadingText('Loading...');
            break;
          default:
            setLoadingText('Loading');
        }
      }
    }, [loading, loadCount, data]);

  useEffect(() => {    
    const items = document.querySelectorAll(".grid-item");
    const textStatus = document.querySelector("#playerTurn");
    const restartBtn = document.querySelector("#restart");
    const grids = [];

    for (let i = 1; i <= 9; i++) {
      document.querySelectorAll(`.grid-${i}`).forEach(grid => grids.push(grid));
  }

  const colorCheck = () => {
    grids.forEach(grid => {
        const gridContent = grid.textContent.trim();
        const gridElement = grid;
    
        if (gridContent === 'X') {
            gridElement.style.color = '#ff0000';
            gridElement.style.textShadow = '0px 0px 10px #ff0000';
        } else if (gridContent === 'O') {
            gridElement.style.color = '#BF40BF';
            gridElement.style.textShadow = '0px 0px 10px #BF40BF';
        }
    });
};

    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let options = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let running = true;

    intGame();


    function intGame() {
      items.forEach((item) => item.addEventListener("click", itemClicked));
      restartBtn.addEventListener("click", restartGame);
      textStatus.textContent = `${currentPlayer}'s turn`;
    }

    function itemClicked() {
      const itemIndex = this.getAttribute("itemIndex");

      if (options[itemIndex] !== "" || !running) {
        return;
      }

      updateItem(this, itemIndex);
      checkWinner();
    }

    function updateItem(item, index) {
      options[index] = currentPlayer;
      item.textContent = currentPlayer;
      colorCheck();
    }

    function changePlayer() {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      textStatus.textContent = `${currentPlayer}'s turn`;
    }

    function checkWinner() {
      let roundWon = false;
      for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const itemA = options[condition[0]];
        const itemB = options[condition[1]];
        const itemC = options[condition[2]];

        if (itemA === "" || itemB === "" || itemC === "") {
          continue;
        }
        if (itemA === itemB && itemB === itemC) {
          roundWon = true;
          break;
        }
      }

      if (roundWon) {
        textStatus.textContent = `${currentPlayer} wins!`;
        if(currentPlayer === `X`){
          updateTtt({ variables: { outcome: '2' } })
        } else {
          updateTtt({ variables: { outcome: '1' } })
        }
        running = false;
      } else if (!options.includes("")) {
        textStatus.textContent = `Draw!`;
        updateTtt({ variables: { outcome: '0' } })
        running = false;
      } else {
        changePlayer();
      }
    }

    function restartGame() {
      location.reload();
    }

    function itemClicked() {
      const itemIndex = this.getAttribute("itemindex");

      if (options[itemIndex] !== "" || !running) {
          return;
      }

      updateItem(this, itemIndex);

      checkWinner();

      if (running) {
        simulateBotMove()
      }
  }

  function simulateBotMove() {
      let emptyCells = [];
      options.forEach((cell, index) => {
          if (cell === "") {
              emptyCells.push(index);
          }
      });

      for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const itemA = options[condition[0]];
        const itemB = options[condition[1]];
        const itemC = options[condition[2]];

        switch(`${itemA},${itemB},${itemC}`) {
          case "X,X,":
              if (itemC === "") {
                  updateItem(items[condition[2]], condition[2]);
                  return checkWinner();
              }
          case "X,,X":
              if (itemB === "") {
                  updateItem(items[condition[1]], condition[1]);
                  return checkWinner();
              }
          case ",X,X":
              if (itemA === "") {
                  updateItem(items[condition[0]], condition[0]);
                  return checkWinner();
              }
              break;
      }
  }

      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const chosenIndex = Math.random() < 0.9 ? emptyCells[randomIndex] : Math.floor(Math.random() * 9);

      updateItem(items[chosenIndex], chosenIndex);

      checkWinner();
}

}, []);

  return (
    <div className='height-ttt'>
      <div className='absolute-ttt'>
        <div className="container">
          <h1 className='ttt-tag'>Tic-Tac-Toe</h1>
          <div className="grid">
            <div itemindex="0" className="grid-item grid-1"></div>
            <div itemindex="1" className="grid-item grid-2"></div>
            <div itemindex="2" className="grid-item grid-3"></div>
            <div itemindex="3" className="grid-item grid-4"></div>
            <div itemindex="4" className="grid-item grid-5"></div>
            <div itemindex="5" className="grid-item grid-6"></div>
            <div itemindex="6" className="grid-item grid-7"></div>
            <div itemindex="7" className="grid-item grid-8"></div>
            <div itemindex="8" className="grid-item grid-9"></div>
          </div>
          <h2 id="playerTurn"></h2>
          <button id="restart">Restart</button>
          <h3 id='ttt-score'>{loadingText}</h3>
        </div>
      </div>
    </div>
  );
}