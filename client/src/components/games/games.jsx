import Link from '@mui/material/Link';
import Leaderboard from '../leaderboard/leaderboard';
import ScoreCard from '../scores/scores';


export default function GameDisplayCards(){
    return (
    <>
      <ScoreCard/>
        <div className='games-container'>
        
        <div className="game-card-center">
        <div className="single-game">
            <div className='games-flex-direction'>
                <img className='game-img' src="/images/ttt.webp"/>
                <div className='game-tag'>
                    <p className='game-name-tag'>TIC-TAC-TOE</p>
                    <Link href="/ttt" ><button className="main-play-btn">PLAY</button></Link>
                </div>  
            </div>
        </div>
        </div>
             
        <div className="game-card-center">
        <div className="single-game">
            <div className='games-flex-direction'>
                <img className='game-img' src="/images/dino.webp"/>
                <div className='game-tag'>
                    <p className='game-name-tag'>DINO</p>
                    <Link href="/dino" ><button className="main-play-btn">PLAY</button></Link>
                </div>  
            </div>
        </div>
        </div>
        
        <div className="game-card-center">
        <div className="single-game">
            <div className='games-flex-direction'>
                <img className='game-img' src="/images/snake.webp"/>
                <div className='game-tag'>
                    <p className='game-name-tag'>SNAKE</p>
                    <Link href="/snake" ><button className="main-play-btn">PLAY</button></Link>
                </div>  
            </div>
        </div>
        </div>
        </div>
        <Leaderboard/>
        </>
    )
};