import Link from '@mui/material/Link';

export default function GameDisplayCards(){
    return (
        <div className="gamesContainer">
        <div className="singleGame">
            <img className= "gameImage" src="./public/images/ttt.webp"/> 
            <Link underline="hover" color="inherit" href="/ttt">
                <button className="playButton"> Click Me to Play </button>
                </Link>
        </div>
            
    
            
        <div className="singleGame"> 
            <img className= "gameImage" src="./public/images/dino.webp"/>
            <Link underline="hover" color="inherit" href="/dino">
                <button className="playButton"> Click Me to Play </button>
                </Link>
            
        </div> 
        
        <div className="singleGame">
            <img className= "gameImage" src="./public/images/snake.webp"/>
            <Link underline="hover" color="inherit" href="/snake">
                <button className="playButton"> Click Me to Play </button>
                </Link>  
        </div>

        </div>
    )
};