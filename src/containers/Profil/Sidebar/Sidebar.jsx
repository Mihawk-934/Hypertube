import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BiIdCard } from 'react-icons/bi';
import { RiPlayListAddLine } from 'react-icons/ri';
import { FiShoppingCart } from 'react-icons/fi';
import { GrGroup } from 'react-icons/gr';
import { useLocation } from 'react-router-dom';
import useStateWithCallback from 'use-state-with-callback';
import './Sidebar.css';

const Sidebar = () => {
    const [color1, setColor1] = useState('NavLinkProfil');
    const [color2, setColor2] = useState('NavLinkProfil');
    const [color3, setColor3] = useState('NavLinkProfil');
    const [color4, setColor4] = useState('NavLinkProfil');

    let location = useLocation();
    let [pathname, setPathname] = useStateWithCallback("", ()=> color());

    const color = () =>{
        setColor1('NavLinkProfil');
        setColor2('NavLinkProfil');
        setColor3('NavLinkProfil');
        setColor4('NavLinkProfil');

        if (pathname === '/profil/')
            setColor1('NavLinkProfilClick');
        else if (pathname === '/profil/MyOrder')
            setColor2('NavLinkProfilClick');
        else if (pathname === '/profil/MyList')
            setColor3('NavLinkProfilClick');
        else if (pathname === '/profil/Social')
            setColor4('NavLinkProfilClick');
    }
    
    useEffect(() => {
        setPathname(location.pathname);
    }, []);

    return (
        <ul className="UlProfil" >
            <NavLink to="/profil/" className={color1} style={{textDecoration:'none'}} >
                <BiIdCard className='LogoProfil'/>
                <li className='LiProfil'>Mes informations</li>
            </NavLink>
            <NavLink to="/profil/MyOrder" className={color2} style={{textDecoration:'none'}}>
                <FiShoppingCart className='LogoProfil'/>
                <li className='LiProfil'>Mes commandes</li>
            </NavLink>
            <NavLink to="/profil/MyList" className={color3} style={{textDecoration:'none'}}>
                <RiPlayListAddLine className='LogoProfil'/>
                <li className='LiProfil'>Ma Liste</li>
            </NavLink>
            <NavLink to="/profil/Social" className={color4} style={{textDecoration:'none'}}>
                <GrGroup className='LogoProfil'/>
                <li className='LiProfil'>Social</li>
            </NavLink>
        </ul>
    )
}

export default Sidebar;