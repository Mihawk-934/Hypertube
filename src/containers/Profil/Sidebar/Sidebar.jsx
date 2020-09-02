import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BiIdCard } from 'react-icons/bi';
import { RiPlayListAddLine } from 'react-icons/ri';
import { FiShoppingCart } from 'react-icons/fi';
import { GrGroup } from 'react-icons/gr';

import { useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [color1, setColor1] = useState('LiProfil');
    const [color2, setColor2] = useState('LiProfil');
    const [color3, setColor3] = useState('LiProfil');

    function Params () {
        let params = useLocation();
        useEffect (() => {
            console.log(params)
            // if (child.type.name='MyInfo')
            //     setColor1('LiClick')
            // else if (child.type.name='MyOrder')
            //     setColor2('LiClick')
            // else if (child.type.name='MyList')
            //     setColor3('LiClick')
        }, [params])
    }
    
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
    Params ();

    return (
        <ul className="UlProfil" >
            <NavLink to="/profil/" className='NavLinkProfil' style={{textDecoration:'none'}}>
                <BiIdCard className='LogoProfil'/>
                <li className={color1} id='1'>Mes informations</li>
            </NavLink>
            <NavLink to="/profil/MyOrder" className='NavLinkProfil' style={{textDecoration:'none'}}>
                <FiShoppingCart className='LogoProfil'/>
                <li className={color2} id='2'>Mes commandes</li>
            </NavLink>
            <NavLink to="/profil/MyList" className='NavLinkProfil' style={{textDecoration:'none'}}>
                <RiPlayListAddLine className='LogoProfil'/>
                <li className={color3} id='3' >Ma Liste</li>
            </NavLink>
            <NavLink to="/profil/Social" className='NavLinkProfil' style={{textDecoration:'none'}}>
                <GrGroup className='LogoProfil'/>
                <li className={color3} id='4' >Social</li>
            </NavLink>
        </ul>
    )
}

export default Sidebar;