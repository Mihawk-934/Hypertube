import React from 'react';

import { NavLink } from 'react-router-dom';
import N from '../../../../assets/netflix.png';

const Logo = () => (
    <NavLink to="/home">
        <img src={N} alt="logo bobine film png" style={{height: "90px", width:'200px'}}/>
    </NavLink>     
)

export default Logo; 