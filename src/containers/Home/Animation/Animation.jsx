import React from 'react';
import './Animation.css';

const Animation = () => (
    <video className="video" src={process.env.PUBLIC_URL + '/anim.mp4'} autoPlay={true} type="video/mp4"/>
)

export default Animation;