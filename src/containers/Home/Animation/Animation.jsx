import React from 'react';
import './Animation.css';
const Animation = () => (
    // <div className="logo">
    //     <div className="netflix">
    //         <span></span>
    //         <span></span>
    //         <span></span>
    //     </div>
    //     <h3>Netflix</h3>
    //     <audio autoPlay={true} src={process.env.PUBLIC_URL + '/anim.mp3'}/>
    // </div>
    
    <video className="logo" src={process.env.PUBLIC_URL + '/anim.mp4'} autoPlay={true} type="video/mp4"/>
)

export default Animation;