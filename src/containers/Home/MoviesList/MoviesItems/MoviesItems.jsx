import React, { Component } from 'react';
import '../MoviesList.css';
import MovieItem from './MoviesItem/MovieItem';
import { withRouter } from 'react-router-dom';

class MovieItems extends Component {
    clicked = (id) => {
        this.props.history.push(`/movie/${id}`);
    }

    render() {
        return (
            <ul className="Ul">
              {this.props.movies.map(movie => {
                return <MovieItem key={movie.id} movie={movie} clicked={() => this.clicked(movie.id)}/>;
              })}
            </ul>
        );
    }
    
};

export default withRouter(MovieItems);