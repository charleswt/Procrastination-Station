export default function GameDisplayCards(){
    return (
        <div className="gamesContainer">
        <div className="singleGame">
            <img src="./public/images/ttt.webp"/> 

            <button className="playButton"> Click Me to Play </button>
        </div>
            
    
            
        <div className="singleGame"> 
            <img src="./public/images/dino.webp"/>
            <button className="playButton"> Click Me to Play </button>
        </div> 
        
        <div className="singleGame">
            <img src="./public/images/snake.webp"/>
            <button className="playButton"> Click Me to Play </button>   
        </div>

        </div>
    )
};