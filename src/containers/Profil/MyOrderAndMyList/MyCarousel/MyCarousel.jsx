import React from 'react';
import { Carousel } from '3d-react-carousal';
import { useSelector } from 'react-redux';
import './MyCarousel.css';
import { useEffect, useState } from 'react';

const MyCarousel = (props) => {

    const [ok, setOk] = useState(true)
    useEffect (() => {
        return( () => setOk(false))
    }, [])
    const movies = useSelector(state => state.movies.movies);
    const slides = movies.map(movie => (
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className='ImgMyList' alt={movie.id} key={movie.id}/>
                </div>
                <div className="flip-card-back">
                    <h1>{movie.title}</h1>
                </div>
            </div>
        </div>
    ));

    return ( 
        <div className='PageMyInfo'>
            <h1 className='Title'>{props.title}</h1>
            <div className="BlockContainer">
                <div className="TitleBackground">
                    <h4 className='h4'>{props.h4}</h4>
                </div>
                <div className="BlockMyList">
                    {movies.length && ok !== 0 && <Carousel slides={slides} autoplay={true} />}
                </div>
            </div>
        </div>
    )
}

export default MyCarousel;