import React from 'react';
import { Link } from 'react-router-dom';
import N from '../../../../assets/kiss.png';

const Logo = () => (
    <Link to={ localStorage.getItem("token") ? "/home" : "/register"}>
        <img src={N} alt="logo" style={{width:'160px'}}/>
    </Link>
) 

export default Logo; 