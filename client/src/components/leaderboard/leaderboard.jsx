import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../utils/queries";

export default function Leaderboard() {
  const { loading, data } = useQuery(GET_USERS);

  useEffect(() => {
    if (data && !loading) {
      const usersCopy = [...data.getUsers];
  
      const sortedUsers = usersCopy.sort((a, b) => {

        return b.ttt.split(" ")[1] - a.ttt.split(" ")[1]
        }
      );
  
      const topThree = sortedUsers.slice(0, 3);
      console.log(topThree)
  
      const leaderboardHTML = topThree.map((user) => (
        `<p key="${user.username}">${user.username}: ${user.ttt}</p>`
      ));
      
      document.querySelector('#getUsers').innerHTML = leaderboardHTML;
    }
  }, [data, loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="leaderboard-position">
        <p className="leaderboard-header">Leader Board</p>
        <p className="leaderboard-sub-headers">Tic-Tac-Toe</p>
        <div id="getUsers" className="leaderboard-scores"></div>
    </div>
  );
}