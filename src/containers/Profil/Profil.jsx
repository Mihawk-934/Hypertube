import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
// import 

import MyOrder from './MyOrder/MyOrder'
import './Profil.css'

const MyProfil = (props) =>  {
    const [color1, setColor1] = useState('LiProfil');
    const [color2, setColor2] = useState('LiProfil');
    const [color3, setColor3] = useState('LiProfil');

    const clicked = (e) => {
        setColor1('LiProfil');
        setColor2('LiProfil');
        setColor3('LiProfil');
        if (e.target.id === '1') 
            setColor1('LiClick');
        if (e.target.id === '2')
            setColor2('LiClick');
        if (e.target.id === '3')
            setColor3('LiClick');
    };

    return (
        <div className="PageProfil">
            <div className="NavProfil">
                <ul className="UlProfil">
                    {/* <Link to="/profil/MyOrder"> */}
                        <li className={color1} id='1' onClick={clicked}>Mes informations</li>
                    {/* </Link> */}
                    <li className={color2} id='2' onClick={clicked}>Mes commandes</li>
                    <li className={color3} id='3' onClick={clicked}>Ma Liste</li>
                </ul>
            </div>
            
            <div className="Children">
                {/* <Route path="/profil/MyOrder" exact component={MyOrder}/> */}
            </div>
        </div>
    );
};

export default MyProfil;