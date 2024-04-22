import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../utils/queries";

export default function Leaderboard() {
  const { loading, data } = useQuery(GET_USERS);

  useEffect(() => {
    if (data && !loading) {
      const usersCopy = [...data.getUsers];
  
      const sortedTtt = usersCopy.sort((a, b) => {

        return b.ttt.split(" ")[1] - a.ttt.split(" ")[1]
        }
      );
  
      const top3Ttt = sortedTtt.slice(0, 3);
  
      const leaderboardTtt = top3Ttt.map((user) => (
        `<p key="${user.username}">${user.username}: ${user.ttt}</p>`
      ));
      
      document.querySelector('#leaderboardTtt').innerHTML = leaderboardTtt;

      const sortedDino = usersCopy.sort((a, b)=>{
        return b.dino - a.dino
      })

      const top3Dino = sortedDino.slice(0, 3);

      const leaderboardDino = top3Dino.map((user) => (
        `<p key="${user.username}">${user.username}: ${user.dino}</p>`
      ));

      document.querySelector('#leaderboardDino').innerHTML = leaderboardDino;

      const sortedSnake = usersCopy.sort((a, b)=>{
        return b.snake - a.snake
      })

      const top3Snake = sortedSnake.slice(0, 3);

      const leaderboardSnake = top3Snake.map((user) => (
        `<p key="${user.username}">${user.username}: ${user.snake}</p>`
      ));

      document.querySelector('#leaderboardSnake').innerHTML = leaderboardSnake;
    }
  }, [data, loading]);

  return (
    <>{data && <div className="leaderboard-position">
        <p className="leaderboard-header">Leader Board</p>
        <p className="leaderboard-sub-headers">Tic-Tac-Toe</p>
        <div id="leaderboardTtt" className="leaderboard-scores"></div>
        <p className="leaderboard-sub-headers">Dino</p>
        <div id="leaderboardDino" className="leaderboard-scores"></div>
        <p className="leaderboard-sub-headers">Snake</p>
        <div id="leaderboardSnake" className="leaderboard-scores"></div>
        <p className="leaderboard-marg"></p>
    </div>}</>
    
  );
}