import React from 'react';
import { Container, Row, Image, Col } from 'react-bootstrap';
// import Modal from './Modal/Modal';
import Rubrique from './Rubrique/Rubrique';
import Rubrique2 from './Rubrique2/Rubrique2';
// import { FaEye } from "react-icons/fa";
import Icons from './Icons/Icons';
// import noFilm from '../../../assets/noAffiche.png'

import "react-circular-progressbar/dist/styles.css";

import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";

const Presentation = (props) => {

    const styles = {
        root: {
          width: '100%',
        },
        path: {
          stroke: `rgba(62, 152, 199)`,
          strokeLinecap: 'round',
          transition: 'stroke-dashoffset 0.5s ease 0s',
        },
        trail: {
          stroke: 'red',
        },
        background: {
            color:'red'
        }
      }

    return (
        <Container>
            <Row>
                <Col sm={12} md={4}>
                    <>
                        {/* { props.movie.poster_path ?  */}
                            <Image style={{ width: "100%", height: "auto" }} src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`} alt={`poster ${props.movie.title}`}/>
                            {/* :  */}
                            {/* <Image style={{ width: "100%", height: "auto" }} src={noFilm} alt={`poster ${props.movie.title}`}/> */}
                        {/* } */}
                    </>
                    <Icons/>
                    {/* {props.movie.youtubeKey && <Modal id={props.movie.youtubeKey}/>} */}
                </Col>
                <Col sm={12} md={8}>
                    <Row>
                        <Col> 
                    <h1>{props.movie.title} {props.movie.release_date && <span style={{fontStyle: 'italic', fontSize:'30px'}}>({props.movie.release_date})</span>} </h1>
                            {/* <p><FaEye style={{color:"green", height:'20px', width:'20px'}}/> Deja vu</p> */}
                            <h5>{props.movie.tagline}</h5>
                        </Col>
                    </Row>
                    <Row style={{marginTop: "40px"}}>
                        <Rubrique2 title="Durée" data={props.movie.runtime} min="min"/>
                        
                        <div >
                           
                                <CircularProgressbar
                                    value={props.movie.vote_average*10}
                                    text={`${props.movie.vote_average*10}% `}
                                    circleRatio={0.75}
                                    styles={buildStyles({
                                        rotation: 1 / 2 + 1 / 8,
                                        strokeLinecap: "butt",
                                        trailColor: "#eee",
                                    
                                    })}
                                />
                        </div>
                        

                        {/* <Rubrique2 title="Note" data={props.movie.vote_average}/> */}
                        <Rubrique2 title="Popularité" data={props.movie.popularity}/>
                    </Row>
                    <Rubrique title='Genre' data={props.movie.genres} css="LiMovie" map={true}/>
                    <Rubrique title='Acteurs' data={props.movie.acteurs} map={true} img={true}/>
                    {/* <Rubrique title='Producteurs' data={props.acteurs} map={true}/>
                    <Rubrique title='Realisateur' data={props.acteurs} map={true}/> */}
                    <Rubrique title='Synopisis' data={props.movie.overview}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Presentation;
