import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Video from './Video/Video';
import Modal from './Modal/Modal';
import { Row, Col, Container, Image, Button, Form, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaPlay } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import './Movie.css';

import Slider from './Slider/Slider';

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
        if (this._isMounted) {
            window.scrollTo(0, 0); 
            const { match: { params } } = this.props;
            this.setState({id: params.id}, () => {
                axios.get(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=1e32f5c452c2267d5367589e9864ab1c&append_to_response=videos&language=fr`)
                    .then(response => this.setState({movie : response.data, genre : response.data.genres, years: response.data.release_date.substr(0, 4)}, () => this.idVideoYoutube()))
                    .catch(error => console.log(error));
                axios.get(`https://api.themoviedb.org/3/movie/${this.state.id}/credits?api_key=1e32f5c452c2267d5367589e9864ab1c`)
                    .then(response => this.setState({acteurs: response.data.cast.splice(0, 5)},  () => console.log(this.state.acteurs)))
                    .catch(err => console.log(err))
            });
        }
    };

    componentWillUnmount() {
        this._isMounted = false;
    };

    idVideoYoutube = () => {
        console.log("this.state.movie ---->  ", this.state.movie)
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie.id}?api_key=ee52528a3d2bfff0312880daeaee21b3&append_to_response=videos&&language=frinclude_adult=false`)
            .then(response => {this.setState({youtubeKey: response.data.videos.results[0].key})})
            .catch(error => {this.setState({youtubeKey: null})});
            //je remet la youtubeKey a null quand il n'y a pas d'ID youtube pour ce film.
    };

    componentDidUpdate (prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({id: this.props.match.params.id}, () => {
                axios.get(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=1e32f5c452c2267d5367589e9864ab1c&append_to_response=videos&language=fr`)
                    .then(response => this.setState({movie : response.data, genre : response.data.genres, years: response.data.release_date.substr(0, 4)}, () => this.idVideoYoutube(this.state.movie.id)))
                    .catch(error => console.log(error));
                axios.get(`https://api.themoviedb.org/3/movie/${this.state.id}/credits?api_key=1e32f5c452c2267d5367589e9864ab1c`)
                    .then(response => this.setState({acteurs: response.data.cast.splice(0, 5)},  () => console.log(response.data.cast)))
                    .catch(err => console.log(err))
                window.scrollTo(0, 0);
            });
        };
    };

    submit = (e) => {
        e.preventDefault();
        console.log('OK');
    };

    render () {
        const {movie} = this.state;
        const genres = (
            <Row className="LuMovie">
                {
                    this.state.genre.map(genre => {
                        return <Col sm={3} key={genre.id}><p className="LiMovie" >{genre.name}</p></Col>
                    })
                }
            </Row>
        );

        const acteurs = (
            <Row className="LuMovie">
            {
                this.state.acteurs.map(acteur => {
                    return <Col sm={4} key={acteur.id}><p>{acteur.name}</p></Col>
                })
            }
            </Row>
        )

        let movieBackdropStyles = null;
        if (!!movie.backdrop_path) {
            movieBackdropStyles = {
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize:'cover',
                minHeight:'100vh',
                backgroundColor: 'white',
                backgroundPosition:'center' 
            };
        }

        return (
            <div className="Page" style={movieBackdropStyles}>
                <Container className='Container'>
                    <Container>
                        <Row>
                            <Col sm={12} md={4}>
                                <div>
                                    {!!movie.poster_path ? (
                                        <Image style={{ width: "100%", height: "auto" }} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`poster ${movie.title}`}/>
                                    ) : null}
                                </div>
                                <div className='Icons'>
                                    <OverlayTrigger  placement='bottom'
                                        overlay={<Tooltip id='favoris'>Ajouter aux favoris</Tooltip>}>
                                        <FaHeart className='Fav'/>
                                    </OverlayTrigger>
                                    <OverlayTrigger  placement='bottom'
                                        overlay={<Tooltip id='voir'>A voir plus tard</Tooltip>}>
                                        <IoIosTime className='Vu'/>
                                    </OverlayTrigger>
                                </div>
                                <Modal id={this.state.youtubeKey}/>
                            </Col>
                            <Col sm={12} md={8}>
                                <Row>
                                    <Col> 
                                        <h1>{movie.title} {this.state.years} </h1>
                                        <p style={{marginBottom:'20px'}}><FaEye style={{color:"green", height:'20px', width:'20px'}}/> Deja vu</p>
                                        <h5>{movie.tagline}</h5>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: "40px"}}>
                                    <Col sm={12} md={4}>
                                        <p className='TitreMovie'>Durée</p>
                                        <p>{movie.runtime} min</p>
                                    </Col>
                                    <Col sm={12} md={4}>
                                        <p className='TitreMovie'>Note</p>
                                        <p>{movie.vote_average}</p>
                                    </Col>
                                    <Col sm={12} md={4}>
                                        <p className='TitreMovie'>Popularité</p>
                                        <p>{movie.popularity}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className='TitreMovie'>Genre</p>
                                        {genres} 
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className='TitreMovie'>Producteurs</p>
                                        <div style={{marginBottom:"16px"}}>Jules</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className='TitreMovie'>Realisateur</p>
                                        <div style={{marginBottom:"16px"}}>Alain</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className='TitreMovie'>Acteurs</p>
                                        {acteurs}
                                        {/* <div style={{marginBottom:"16px"}}>Karim</div> */}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className='TitreMovie'>Synopsis</p>
                                        <p>{movie.overview}</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    <Container style={{marginTop:"50px"}}>
                        <Video id={this.state.youtubeKey}/>
                        <Row className="justify-content-md-center">
                            <Col sm={12} md={4}><Button className='BandeAnnonce' variant="danger" block><FaPlay style={{marginRight:"20px"}}/>HD 720p</Button></Col>
                            <Col sm={12} md={4}><Button className='BandeAnnonce' variant="danger" block><FaPlay style={{marginRight:"20px"}}/>HD 1080p</Button></Col>
                        </Row>
                        <Form onSubmit={this.submit} style={{marginTop:"20px"}}>
                            <Form.Label>Ajouter un commentaire</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                            <Button className='BandeAnnonce' variant="danger" type="submit" disabled={this.state.disable}>Valider</Button>
                        </Form>
                    </Container>
                    <Slider idMovie={this.state.id}/>
                </Container>
            </div>
        );
    };
};

export default withRouter(MovieId);