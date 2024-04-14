import { updateGround, setupGround } from './ground.js'
import { updateDino, setupDino, getDinoRects, setDinoLose } from './dino.js'
import { updateCactus, setupCactus, getCactusRects } from './cactus.js'

export default function DinoGame(){
    const WORLD_WIDTH = 100
    const WORLD_HEIGHT = 30
    const SPEED_SCALE_INCREASE = 0.00001
    const worldElem = document.querySelector('[data-world');
    const scoreElem = document.querySelector("[data-score]")
    const startElem = document.querySelector("[data-start-screen")
    setPixelToWorldScale()
    window.addEventListener("resize", setPixelToWorldScale)
    document.addEventListener("keydown", handlestart, {once: true})

    // update screen 
    let lastTime
    let speedScale
    let score
    function update(time){
        if (lastTime == null){
            lastTime = time
            window.requestAnimationFrame(update)
            return
        }
        const delta = time - lastTime
        
        updateGround(delta, speedScale)
        updateDino(delta, speedScale)
        updateSpeedScale(delta)
        updateScore(delta)
        updateCactus(delta, speedScale)
        if (checkLose()) return handleLose()

        lastTime = time
        window.requestAnimationFrame(update);
    }

    function checkLose(){
        const dinoRect = getDinoRects()
        return getCactusRects().some(rect => isCollision(rect, dinoRect))
    }

    function isCollision(rect1, rect2){
        return (
            rect1.left < rect2.right && 
            rect1.top < rect2.bottom && 
            rect1.right > rect2.left && 
            rect1.bottom > rect2.top
        )
    }
    function updateSpeedScale(delta){
        speedScale += delta * SPEED_SCALE_INCREASE
    }

    function updateScore(delta){
        score += delta *0.01
        scoreElem.textContent = Math.floor(score)
    }
    //calls refresh based on speed of monitor
    function handlestart(){
        speedScale = 1
        lastTime = null
        score= 0
        setupGround()
        setupCactus()
        setupDino()
        window.requestAnimationFrame(update)
        startElem.classList.add("hide")
    }

    function handleLose(){
        setDinoLose()
        setTimeout(() => {
            document.addEventListener("keydown", handlestart, { once: true })
            startElem.classList.classList.remove("hide")
        }, 100)
    }
    // resizes game to window height
    function setPixelToWorldScale(){
        let worldToPixelScale
        if (window.innerWidth / window.innerHeight < WORLD_WIDTH/ WORLD_HEIGHT){
            worldToPixelScale = window.innerWidth/ WORLD_WIDTH
        } else {
            worldToPixelScale = window.innerHeight / WORLD_HEIGHT
        }

        worldElem.computedStyleMap.width = `${WORLD_WIDTH * worldToPixelScale} px`
        worldElem.computedStyleMap.height = `${WORLD_HEIGHT * worldToPixelScale} px`
    }

        return (
            <div id="world" data-world>
                <div id="score" data-score> 0 </div>
            <div id="start-screen" data-start-screen> Press Any Key To Start </div>
            <img src="client\public\images\dinoGame\ground.png" className="ground" alt="pixelated image of road" data-ground/>
            <img src="client\public\images\dinoGame\ground.png" className="ground" alt="pixelated image of road" data-ground/>
            <img src="client\public\images\dinoGame\dino-stationary.png" data-dino className="dino" alt="pixelated dinosaur"/>
            <div id="character"></div>
            <div id="block"></div>
            </div>
    )

}