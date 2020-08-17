import React from 'react';
import Iframe from 'react-iframe';

import Img from '../../../assets/bande-annonce_non_disponibe.png';

const Video = (props) => {
    console.log(props.id);
    let affichageVideo = !!props.id ? 
    (
        <div className="embed-responsive embed-responsive-16by9" style={{marginTop:"50px", marginBottom:"50px"}}>
            <Iframe url={`https://www.youtube.com/embed/${props.id}`}
                    id="myId"
                    className="embed-responsive-item"/>
        </div>) 
    : <img src={Img} alt='' className="embed-responsive embed-responsive-16by9" style={{marginTop:"50px", marginBottom:"50px", border:'2px solid white'}}/>
     
    return (
       <>
            {affichageVideo}
        </>
    )
}

export default Video;