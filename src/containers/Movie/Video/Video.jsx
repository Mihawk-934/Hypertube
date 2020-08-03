import React from 'react';
import Iframe from 'react-iframe';

const Video = (props) => (
    <div className="embed-responsive embed-responsive-16by9" style={{marginTop:"50px", marginBottom:"50px"}}>
        <Iframe url={`https://www.youtube.com/embed/${props.id}`}
            id="myId"
            className="embed-responsive-item"/>
    </div>
)

export default Video;