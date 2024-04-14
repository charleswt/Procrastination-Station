import './style.css'
import { useState } from 'react';

export default function DinoGame(){
    const [jump, setJump] = useState("")

    function keyDown(){
        if (jump === ""){
            setJump("jump")
        } 

        setTimeout(function(){
            setJump("")
        }, 300)
    }

    let isAlive = setInterval(function(){
        // getting dino Y position and cactus x position
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"))
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))

        //detect collision
        if(cactusLeft < 50 && cactusLeft >0 && dinoTop >= 140){
            // collision
            alert('You died!')
        }
    },500)

    return (
        <div className="game">
            <div className= {jump} id="dino" onClick={keyDown}></div>
            <div id="cactus"></div>
        </div>
    )
}