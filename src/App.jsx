import { useState } from 'react'
import './App.css'
import GameResult from './GameResult.jsx'


const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;


function App() {
  // state variables here:
  const [game, setGame] = useState({});
  const [banList, setBanList] = useState([]);

  // async function here:
  const getGame = async () => {
    const randomPage = Math.floor(Math.random() * 500); // random number generator for pages
    const URL = `https://api.rawg.io/api/games?key=${ACCESS_KEY}&page_size=1&page=${randomPage}`;
    const response = await fetch(URL); //  fetch url first
    const data = await response.json(); // turn the response into json
    if (data.results[0].genres.some((genre) => banList.includes(genre.name))) { // check if the genre is already banned and if it is call a new game instead
      getGame();
    }
    else {
      setGame(data.results[0]); // else display the game if not banned
    }

  }




  return (
    <>
      <h1>Game Search Randomizer 🎮</h1>
      <h2>Discover a brand new game!</h2>
      <button onClick={getGame} className="game-search-button" >Search 🔀</button>
      {game.name && <GameResult game={game} setBanList={setBanList} banList={banList}/>}
      <div className="ban-list">
        <h3>Ban List: ❌</h3>
        <p>Click a genre to ban it from future searches!</p>
        <br></br>
        {banList.map((bannedGenre) => <p className="banned-genre-button" onClick={() => setBanList(banList.filter((item) => item !== bannedGenre))}>{bannedGenre}</p>)}
      </div>
        
    </>
  )
}

export default App
