import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';

export default function ScoreCard() {
    const { loading, data } = useQuery(GET_ME);

    useEffect(() => {
        if (data && !loading) {
            document.querySelector('#tttScore').innerHTML = data.getMe.ttt;
            document.querySelector('#dinoScore').innerHTML = `High Score: ${data.getMe.dino}`;
            document.querySelector('#snakeScore').innerHTML = `High Score: ${data.getMe.snake}`;
        }
    }, [data, loading]);

    return (
        <>
            {data === undefined ? (
                <img className="hero" src="./public/images/hero.webp"/>
            ) : (
                <>
                <img className="hero" src="./public/images/hero.webp"/>
                <div className="score-card">
                    <h1 className='score-card-h1'>Score Card</h1>
                    <h2>Tic-Tac-Toe</h2>
                    <div id="tttScore" className="score-card-score"></div>
                    <h2>Dino</h2>
                    <div id="dinoScore" className="score-card-score"></div>
                    <h2>Snake</h2>
                    <div id="snakeScore" className="score-card-score"></div>
                </div>
                </>
            )}
        </>
    );
}