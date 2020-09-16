import React from 'react';
import N from '../../../../assets/kiss.png';

const Logo = () => (
    <a href={ localStorage.getItem("token") ? "/home" : "/"}>
        <img src={N} alt="logo" style={{width:'160px'}}/>
    </a>     
)

export default Logo; 