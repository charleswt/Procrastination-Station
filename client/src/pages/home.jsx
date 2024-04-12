import GameDisplayCards from '../components/gameDisplayCards'

const Home = () => {
    return (
        <div> Home page 
            <GameDisplayCards /> 
            {/* if card clicked then render GamePlay.jsx component */}
        </div>
    )
}

export default Home;