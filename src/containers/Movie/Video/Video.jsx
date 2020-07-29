import React from 'react';
import Iframe from 'react-iframe';

const Video = (props) => {
    return (
        <div className="embed-responsive embed-responsive-16by9" style={{marginTop:"50px", marginBottom:"50px"}}>
            {
                props.id ? 
                <Iframe url={`https://www.youtube.com/embed/${props.id}`}
                    id="myId"
                    className="embed-responsive-item"/> :
                <p>Trailer indisponible</p>
            }
        </div>
    )
};

export default Video