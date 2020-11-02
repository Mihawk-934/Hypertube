import React from 'react';
import '../MoviesItems.css';

const MovieItem = (props) => (
    <li className="LiMoviesItem" key={props.movie.id} >
        <div className="triangle">
            <span className="Note">{props.movie.vote_average}</span>
        </div>
        <div className='BlockImage'>
            <img className='Img' src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} alt={props.movie.id} onClick={props.clicked}/>
        </div>
    </li>
);

export default MovieItem;