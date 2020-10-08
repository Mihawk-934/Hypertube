import React from 'react';
import './Animation.css';

const Animation = () => {
    const video = !!navigator.userAgent.match(/[Ss]afari/)[0] ?
    ( <video className="video" id="intro" src={process.env.PUBLIC_URL + '/anim.mp4'} autoPlay={true} type="video/mp4"/>)
    : ( <video className="video" id="intro" muted src={process.env.PUBLIC_URL + '/anim.mp4'} autoPlay={true} type="video/mp4"/>)
    return (
        <>{video}</>
    )
}

export default Animation;