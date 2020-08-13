import React from 'react';
import '../MoviesItems.css';
// import { FaEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { Tooltip, OverlayTrigger} from 'react-bootstrap';

const MovieItem = (props) => (
    <li className="LiMoviesItem" key={props.movie.id} >
        <div className="triangle">
        <span className="Note">{props.movie.vote_average}</span>
        </div>
        
        <div className='BlockImage'>
            {
                props.movie.poster_path === null ? <div className='Img' style={{backgroundColor:"black"}} onClick={props.clicked}>Image Non Disponible</div> :
                <img className='Img' src={`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`} alt={props.movie.id} onClick={props.clicked}/>
            }
            <div className="Logo">
                <OverlayTrigger  placement='bottom'
                    overlay={<Tooltip id='favoris'>Ajouter aux favoris</Tooltip>}> 
                    <FaHeart className ='Favoris'/>
                </OverlayTrigger>
                <OverlayTrigger  placement='bottom'
                    overlay={<Tooltip id='voir'>A voir plus tard</Tooltip>}>
                    <IoIosTime className ='Voir'/>
                </OverlayTrigger>
            </div>
        </div>
        {/* <p className="TitreMoviesItem">
            <OverlayTrigger  placement='bottom'
                overlay={<Tooltip id='dejaVu'>Deja vu</Tooltip>}>
                <FaEye style={{color:"green", marginRight:"10px"}}/>
            </OverlayTrigger>
            {props.movie.title}
        </p> */}
    </li>
);

export default MovieItem;