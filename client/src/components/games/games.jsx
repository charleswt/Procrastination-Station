import Link from '@mui/material/Link';

export default function GameDisplayCards(){
    return (
        <>
        <img className="hero" src="./public/images/hero.webp"/>
        
        <div className="gamesContainer">
        <div className="singleGame">
            
            <div className='games-flex-direction'>
                <img className='game-img' src="./public/images/ttt.webp"/>
                <div className='game-tag'>
                    <p className='game-name-tag'>TIC-TAC-TOE</p>
                    <Link href="/snake" ><button className="main-play-btn">PLAY</button></Link>
                </div>  
            </div>
        </div>
            
    
            
        <div className="singleGame">
            
            <div className='games-flex-direction'>
                <img className='game-img' src="./public/images/dino.webp"/>
                <div className='game-tag'>
                    <p className='game-name-tag'>DINO</p>
                    <Link href="/snake" ><button className="main-play-btn">PLAY</button></Link>
                </div>  
            </div>
        </div>
        
        <div className="singleGame">
            
            <div className='games-flex-direction'>
                <img className='game-img' src="./public/images/snake.webp"/>
                <div className='game-tag'>
                    <p className='game-name-tag'>SNAKE</p>
                    <Link href="/snake" ><button className="main-play-btn">PLAY</button></Link>
                </div>  
            </div>
        </div>

        </div>
        </>
    )
};