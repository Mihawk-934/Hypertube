import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Video from './Video/Video';
import Modal from './Modal/Modal';
import Rubrique from './Rubrique/Rubrique'
import Slider from './Slider/Slider';
// import MyButton from '../../components/MyButton/MyButton';
import { Row, Col, Container, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
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
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie.id}?api_key=ee52528a3d2bfff0312880daeaee21b3&append_to_response=videos&&language=frinclude_adult=false`)
            .then(response => {this.setState({youtubeKey: response.data.videos.results[0].key})})
            .catch(error => {this.setState({youtubeKey: null}, () => {console.log(error)})});
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
    };

    render () {
        const {movie} = this.state;

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
                                        <p><FaEye style={{color:"green", height:'20px', width:'20px'}}/> Deja vu</p>
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

                                <Rubrique title='Genre' data={this.state.genre} css="LiMovie" map={true}/>
                                <Rubrique title='Acteurs' data={this.state.acteurs} map={true}/>
                                <Rubrique title='Producteurs' data={this.state.acteurs} map={true}/>
                                <Rubrique title='Realisateur' data={this.state.acteurs} map={true}/>
                                <Rubrique title='Synopisis' data={movie.overview}/>
                            </Col>
                        </Row>
                    </Container>

                    {/* <Container > */}
                    {/* ne pas oublier de modifier le CSS de Video si on remet commentaire marginBottom. */}
                    <Video id={this.state.youtubeKey}/>
                        {/* <Form onSubmit={this.submit} style={{marginTop:"20px"}}>
                            <Form.Label>Ajouter un commentaire</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                            <MyButton />
                        </Form> */}
                    {/* </Container> */}
                    <Slider idMovie={this.state.id}/>
                </Container>
            </div>
        );
    };
};

export default withRouter(MovieId);