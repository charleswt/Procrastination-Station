import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../utils/queries";

export default function Leaderboard() {
  const { loading, data } = useQuery(GET_USERS);

  useEffect(() => {
    if (data && !loading) {
      const usersCopy = [...data.getUsers];
  
      const sortedUsers = usersCopy.sort((a, b) => {
        const getTttScore = (user) => {
          const tttScoreReg = /Wins: (\d+) Draws: (\d+) Losses: (\d+)/;
          const matchA = user.pong.match(tttScoreReg);
          const matchB = user.pong.match(tttScoreReg);
          if (matchA && matchB) {
            return parseInt(matchB[1]) - parseInt(matchB[2]) - (parseInt(matchA[1]) - parseInt(matchA[2])); // Calculate net wins
          }
          return 0;
        };
        return getTttScore(b) - getTttScore(a);
      });
  
      const topThree = sortedUsers.slice(0, 3);
  
      const leaderboardHTML = topThree.map((user) => {
        return `<p>${user.username}: ${user.ttt}</p>`;
      })
      
      document.querySelector('#getUsers').innerHTML = leaderboardHTML;
    }
  }, [data, loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="leaderboard-position">
        <p className="leaderboard-header">Leader Board</p>
        <p className="leaderboard-sub-headers">Tic-Tac-Toe</p>
        <p id="getUsers" className="leaderboard-scores"></p>
    </div>
)
}