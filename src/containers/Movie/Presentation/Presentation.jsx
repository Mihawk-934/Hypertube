import React from 'react';
import { Container, Row, Image, Col } from 'react-bootstrap';
import Modal from '../Modal/Modal';
import Rubrique from './Rubrique/Rubrique';
import Rubrique2 from './Rubrique2/Rubrique2';
import { FaEye } from "react-icons/fa";
import Icons from './Icons/Icons';

const Presentation = (props) => {
    return (
        <Container>
            <Row>
                <Col sm={12} md={4}>
                    <div>
                        {!!props.movie.poster_path ? (
                            <Image style={{ width: "100%", height: "auto" }} src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`} alt={`poster ${props.movie.title}`}/>
                        ) : null}
                    </div>
                    <Icons/>
                    <Modal id={props.youtubeKey}/>
                </Col>

                <Col sm={12} md={8}>
                    <Row>
                        <Col> 
                            <h1>{props.movie.title} {props.years} </h1>
                            <p><FaEye style={{color:"green", height:'20px', width:'20px'}}/> Deja vu</p>
                            <h5>{props.movie.tagline}</h5>
                        </Col>
                    </Row>
                    <Row style={{marginTop: "40px"}}>
                        <Rubrique2 title="Durée" data={props.movie.runtime} min="min"/>
                        <Rubrique2 title="Note" data={props.movie.vote_average}/>
                        <Rubrique2 title="Popularité" data={props.movie.popularity}/>
                    </Row>
                    <Rubrique title='Genre' data={props.genre} css="LiMovie" map={true}/>
                    <Rubrique title='Acteurs' data={props.acteurs} map={true}/>
                    <Rubrique title='Producteurs' data={props.acteurs} map={true}/>
                    <Rubrique title='Realisateur' data={props.acteurs} map={true}/>
                    <Rubrique title='Synopisis' data={props.movie.overview}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Presentation;
