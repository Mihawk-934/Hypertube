import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Video from './Video/Video';
import Slider from './Slider/Slider';
import { Container } from 'react-bootstrap';
import Presentation from './Presentation/Presentation';
import './Movie.css';

class MovieId extends Component {
    _isMounted = false;
    state = {
        movie : '',
        genre: [],
        years: '',
        youtubeKey: '',
        id: '',
        acteurs: []
    };

    componentDidMount () {
        this._isMounted = true;
        if (this._isMounted)
            this.infoMovie();
    };

    componentDidUpdate (prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id)
            this.infoMovie();
    };

    componentWillUnmount() {
        this._isMounted = false;
    };

    infoMovie = () => {
        this.setState({id: this.props.match.params.id}, () => {
            axios.get(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=1e32f5c452c2267d5367589e9864ab1c&append_to_response=videos&language=fr`)
                .then(response => this.setState({movie : response.data, genre : response.data.genres, years: response.data.release_date.substr(0, 4)}, () => this.idVideoYoutube()))
                .catch(error => console.log(error));
            axios.get(`https://api.themoviedb.org/3/movie/${this.state.id}/credits?api_key=1e32f5c452c2267d5367589e9864ab1c`)
                .then(response => {
                    let acteurs = response.data.cast.splice(0, 4);
                    acteurs = acteurs.map(acteur => {
                        return {
                            ...acteur,
                            img: true
                        }
                    })
                    this.setState({acteurs: acteurs})
                })
                .catch(err => console.log(err))
            window.scrollTo(0, 0);
        });
    };

    idVideoYoutube = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie.id}?api_key=ee52528a3d2bfff0312880daeaee21b3&append_to_response=videos&&language=frinclude_adult=false`)
            .then(response => {this.setState({youtubeKey: response.data.videos.results[0].key})})
            .catch(error => {this.setState({youtubeKey: null})}); //je remet la youtubeKey a null quand il n'y a pas d'ID youtube pour ce film.
    };

    submit = (e) => {
        e.preventDefault();
    };

    render () {
        let movieBackdropStyles = null;
        if (!!this.state.movie.backdrop_path) {
            movieBackdropStyles = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.movie.backdrop_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize:'cover',
                minHeight:'100vh',
                backgroundColor: 'black',
                backgroundPosition:'center' 
            };
        }

        return (
            <div className="Page" style={movieBackdropStyles}>
                <Container className='Container'>
                    {this.state.movie && <Presentation 
                        movie={this.state.movie}
                        youtubeKey={this.state.youtubeKey}
                        years={this.state.years}
                        acteurs={this.state.acteurs} 
                        genre={this.state.genre}/>}
                    {this.state.youtubeKey && <Video id={this.state.youtubeKey}/>}
                    <Slider idMovie={this.state.id}/>
                </Container>
            </div>
        );
    };
};

export default withRouter(MovieId);
