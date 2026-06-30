import { useState } from 'react';


function GameResult({game, setBanList, banList}) {
    const handleBanList = (genre) => {
        if (banList.includes(genre.name)) {
            setBanList(banList.filter((item) => item !== genre.name)); // if the genre name has already been clicked, then filter it out to avoid duplicates
        }
        else { // otherwise truncate the previous genre from array
            setBanList((prev) => [...prev, genre.name]); 
        }
    }

    return (
        <div>
            <div className="card-container">
                <h2>{game.name}</h2>
                <img src={game.background_image} className="game-image"></img>
                <h3>Rating: {game.rating} ⭐</h3>
                <h3>Genre: 💎 {game.genres && game.genres.map((genre) => <p className="genre-buttons" onClick={() => handleBanList(genre)}>{genre.name}</p>)}</h3>
            

            </div>
            


        </div>
        



    )

};

export default GameResult;