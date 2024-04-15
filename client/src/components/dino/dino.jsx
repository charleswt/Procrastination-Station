import './style.css'
import { useState, useEffect } from 'react';

export default function DinoGame(){

    let [jump, setJump] = useState("")
    let [score, setScore] = useState(0)
    let dinoScore = ()=> {localStorage.setItem('dinoScore', score);} 
    let savedScore = localStorage.getItem('dinoScore')
   
    useEffect(()=>{
        if (score > savedScore){
            dinoScore(score)
        }
    }, [score])

    function keyDown(){
        if (jump === ""){
            setJump("jump")
        } 

        setTimeout(function(){
            setJump("")
        }, 300)
    }
// checking positions of dino and cactus if they collide, send an alert 
    let isAlive = setInterval(function(){
        // getting dino Y position and cactus x position
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

        //detect collision
        if(cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140){
            // collision
            alert('you died')
            setScore(0)
            return false

        } else {
            setScore((score+1));
            return true;
        }
    },700)
// adding to score if alive checking each second
    setInterval(function(){
        if (isAlive){
            setScore((score+1));
        } 
    }, 700)


    return (
        <div className="game">
            <div className= {jump} id="dino" onClick={keyDown}></div>
            <div id="cactus"></div>
            <br></br>
            <div id="score"> High Score: {savedScore}</div>
        </div>
    )
}