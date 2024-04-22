import './style.css'
import { useState, useEffect } from 'react';
import { UPDATE_DINO } from '../../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries'

export default function DinoGame(){

    let [jump, setJump] = useState("")
    let [score, setScore] = useState(0)
    // let dinoScore = ()=> {localStorage.setItem('dinoScore', score);} 
    // let savedScore = localStorage.getItem('dinoScore')
   
    const updateDino = useMutation(UPDATE_DINO)
    const { loading, error, data, refetch } = useQuery(GET_ME);
    // useEffect(()=>{
    //     if (score > savedScore){
    //         dinoScore(score)
    //     }
    // }, [score])

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
    },500)
// adding to score if alive checking each second
    setInterval(function(){
        if (isAlive){
            setScore((score+1));
        } 
    }, 700)

    // using mutation to set score in database, mutation already checks if current score is more than saved score
    const updateDinoScore = async ()=>{
        try{
            await updateDino({
                variables: {
                    dinoScore: score,
                },
                refetchQueries: [{query: GET_ME}]
            })
        } catch(err){
            console.log(err, 'Cannot updated Dino Score');
        }
    };

    return (
        <div className="game">
            <div className= {jump} id="dino" onClick={keyDown}></div>
            <div id="cactus"></div>
            <br></br>
            <div id="score"> High Score: {score}</div>
        </div>
    )
}