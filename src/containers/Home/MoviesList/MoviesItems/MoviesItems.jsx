import React, { Component } from 'react';
import '../MoviesList.css';
import MovieItem from './MoviesItem/MovieItem';
import { withRouter } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

class MovieItems extends Component {
    componentDidMount () {
      Aos.init();
    }

    render() {
        return (
            <ul className="Ul">
              {this.props.movies.map(movie => {
                return (
                <div key={movie.id} data-aos="zoom-out-down" data-aos-duration="2000">
                  <MovieItem movie={movie} clicked={() => this.props.history.push(`/movie/${movie.id}`)}/>
                </div>)
              })}
            </ul>
        );
    }
    
};

export default withRouter(MovieItems);