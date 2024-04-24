import "./style.css";
import React, { useState, useRef, useEffect } from "react";
import { UPDATE_DINO } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";

export default function DinoGame() {
  const [jump, setJump] = useState("");
  const [score, setScore] = useState(0);

  const [updateDino] = useMutation(UPDATE_DINO);
  const { loading, data } = useQuery(GET_ME);
  const [highScore, setHighScore] = useState(0)

  useEffect(()=>{
    if(data && !loading){
        setHighScore(data.getMe.dino)
        console.log(data.getMe.dino)
        console.log(score)
    }  
    
  }, [data, score, highScore])

  useEffect(() => {
    if (data && !loading) {
      if (score > data.getMe.dino) {
        const updateDinoScore = async (score) => {
          try {
            console.log(score)
            await updateDino({ variables: { dino: score } });
          } catch (err) {
            console.log("Cannot update Dino Score:", err);
          }
        };
        updateDinoScore(score);
        console.log(updateDinoScore(score))
      }
    }
  }, [score, data, loading]);

  const dinoRef = useRef(null);
  const cactusRef = useRef(null);

  function keyDown() {
    if (jump === "") {
      setJump("jump");
      setTimeout(() => setJump(""), 450);
    }
  }

  function startGame() {
    if (score === 0) {
      let alive = setInterval(async () => {
        let dinoTop = parseInt(
          window.getComputedStyle(dinoRef.current).getPropertyValue("top")
        );
        let cactusLeft = parseInt(
          window.getComputedStyle(cactusRef.current).getPropertyValue("left")
        );

        if (cactusLeft <= 50 && cactusLeft > 0 && dinoTop >= 140) {
          console.log("Collision detected");
          clearInterval(alive);
          setScore(0);
          alive = 0;
        }
      }, 100);

      const incrementScore = setInterval(() => {
        if (alive) {
          setScore(score => score + 1);
        } else {
          clearInterval(incrementScore);
        }
      }, 1000);
    }
  }
  


  return (
    <div className="game">
      {data && <div className="dino-highscore" id="dinoScore">High Score: {highScore}</div>}
      <div className={jump} ref={dinoRef} id="dino"></div>
      <div ref={cactusRef} id="cactus"></div>
      <br />
      <div id="score">Score: {score}</div>
      <button className="dino-jump-btn" onClick={keyDown}>
        Jump
      </button>
      <button className="dino-start-btn" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
}