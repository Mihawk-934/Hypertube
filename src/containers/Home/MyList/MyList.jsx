import { Carousel } from '3d-react-carousal';
import React from 'react';
import { useSelector } from 'react-redux';
import './MyList.css';

const MyList = () => {

    const movies = useSelector(state => state.movies.movies);
    const slides = movies.map(movie => (
        <div>
            <img style={{width:'920px', height:'400px'}} src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.id} key={movie.id}/>
            <h1 className='h1MyList'>{movie.title}</h1>
        </div>
    ));

    return (
        <>
            <h3>Ma Liste:</h3>
            {movies.length !== 0 && <Carousel slides={slides} autoplay={true} interval={4000}/>}
        </>
    )
}

export default MyList;