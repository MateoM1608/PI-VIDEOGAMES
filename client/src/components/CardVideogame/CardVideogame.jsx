import React from 'react';
import { Link } from 'react-router-dom'
import './CardVideogame.css'

const cardVidegame = ({name, Genres, image, rating, id}) =>{


    return (
        <div className='divC'>
            <Link style={{textDecoration:"none"}}to={`/videogame/${id}`}>
            <div  className='divimg'>
                <img  className="img" src={image} alt="img"/>
                <p  className='rating'>{rating}</p>
            </div>
            
            <h2 className='titlecard'>{name}</h2>
            <div className='orderGenres'>
            {Genres && Genres.map((g,index) => (
                <p key={index} className="genresCard">{g}</p>
            ))}
            </div>
            </Link>
            
        </div>
    )
}

export default cardVidegame;