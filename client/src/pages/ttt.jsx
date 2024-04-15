import React, { useEffect } from 'react';
import '../../public/css/style.css';

export default function TTT() {

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
        running = false;
      } else if (!options.includes("")) {
        textStatus.textContent = `Draw!`;
        running = false;
      } else {
        changePlayer();
      }
    }

    function restartGame() {
      location.reload();
    }

    function itemClicked() {
      const itemIndex = this.getAttribute("itemIndex");

      if (options[itemIndex] !== "" || !running) {
          return;
      }

      updateItem(this, itemIndex);

      checkWinner();

      if (running) {
          setTimeout(simulateBotMove, 500);
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
              break;
          case "X,,X":
              if (itemB === "") {
                  updateItem(items[condition[1]], condition[1]);
                  return checkWinner();
              }
              break;
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
            <div itemIndex="0" className="grid-item grid-1"></div>
            <div itemIndex="1" className="grid-item grid-2"></div>
            <div itemIndex="2" className="grid-item grid-3"></div>
            <div itemIndex="3" className="grid-item grid-4"></div>
            <div itemIndex="4" className="grid-item grid-5"></div>
            <div itemIndex="5" className="grid-item grid-6"></div>
            <div itemIndex="6" className="grid-item grid-7"></div>
            <div itemIndex="7" className="grid-item grid-8"></div>
            <div itemIndex="8" className="grid-item grid-9"></div>
          </div>
          <h2 id="playerTurn"></h2>
          <button id="restart">Restart</button>
        </div>
      </div>
    </div>
  );
}