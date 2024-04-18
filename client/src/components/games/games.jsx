import Link from '@mui/material/Link';

export default function GameDisplayCards(){
    return (
        <div className='games-container'>
        <img className="hero" src="<%= require('../../../public/images/hero.webp') %>"/>
        
        <div className="game-card-center">
        <div className="single-game">
            <div className='games-flex-direction'>
                <img className='game-img' src="<%= require('../../../public/images/ttt.webp') %>"/>
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
                <img className='game-img' src="<%= require('../../../public/images/dino.webp') %>"/>
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
                <img className='game-img' src="<%= require('../../../public/images/snake.webp') %>"/>
                <div className='game-tag'>
                    <p className='game-name-tag'>SNAKE</p>
                    <Link href="/snake" ><button className="main-play-btn">PLAY</button></Link>
                </div>  
            </div>
        </div>
        </div>
        </div>
    )
};