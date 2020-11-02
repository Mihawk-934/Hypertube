import React from 'react';
import './Animation.css';

const Animation = () => {
    return (
        <>
            <audio src={process.env.PUBLIC_URL + '/netflix.mp3'} autoPlay/>
            <video className="video" muted src={process.env.PUBLIC_URL + '/anim.mp4'} autoPlay={true} type="video/mp4"/>
        </>
    )
}

export default Animation;