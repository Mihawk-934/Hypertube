import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BiIdCard } from 'react-icons/bi';
import { RiPlayListAddLine } from 'react-icons/ri';
import { FiShoppingCart } from 'react-icons/fi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import useStateWithCallback from 'use-state-with-callback';
import './Sidebar.css';

const Sidebar = () => {
    const [color1, setColor1] = useState('NavLinkProfil');
    const [color2, setColor2] = useState('NavLinkProfil');
    const [color3, setColor3] = useState('NavLinkProfil');
    const [color4, setColor4] = useState('NavLinkProfil');

    const [color5, setColor5] = useState('LogoProfil');
    const [color6, setColor6] = useState('LogoProfil');
    const [color7, setColor7] = useState('LogoProfil');
    const [color8, setColor8] = useState('LogoProfil');

    const [color9, setColor9] = useState('LiProfil');
    const [color10, setColor10] = useState('LiProfil');
    const [color11, setColor11] = useState('LiProfil');
    const [color12, setColor12] = useState('LiProfil');

    let location = useLocation();
    let [pathname, setPathname] = useStateWithCallback("", ()=> color());

    const color = () =>{
        setColor1('NavLinkProfil');
        setColor2('NavLinkProfil');
        setColor3('NavLinkProfil');
        setColor4('NavLinkProfil');

        setColor5('LogoProfil');
        setColor6('LogoProfil');
        setColor7('LogoProfil');
        setColor8('LogoProfil');

        setColor9('LiProfil');
        setColor10('LiProfil');
        setColor11('LiProfil');
        setColor12('LiProfil');

        if (pathname === '/profil/') {
            setColor1('NavLinkProfilClick');
            setColor5('LogoProfilClick');
            setColor9('LiClick');
        }
        else if (pathname === '/profil/MyOrder') {
            setColor2('NavLinkProfilClick');
            setColor6('LogoProfilClick');
            setColor10('LiClick');
        }
        else if (pathname === '/profil/MyList') {
            setColor3('NavLinkProfilClick');
            setColor7('LogoProfilClick');
            setColor11('LiClick');
        }
        else if (pathname === '/profil/Social') {
            setColor4('NavLinkProfilClick');
            setColor8('LogoProfilClick');
            setColor12('LiClick');
        } 
    }
    
    useEffect(() => {
        setPathname(location.pathname);
    }, []);

    return (
        <ul className="UlProfil" >
            <NavLink to="/profil/" className={color1} style={{textDecoration:'none'}} >
                <BiIdCard className={color5}/>
                <li className={color9}>Mes informations</li>
            </NavLink>
            <NavLink to="/profil/MyOrder" className={color2} style={{textDecoration:'none'}}>
                <FiShoppingCart className={color6} />
                <li className={color10}>Mes commandes</li>
            </NavLink>
            <NavLink to="/profil/MyList" className={color3} style={{textDecoration:'none'}}>
                <RiPlayListAddLine className={color7} />
                <li className={color11}>Ma Liste</li>
            </NavLink>
            <NavLink to="/profil/Social" className={color4} style={{textDecoration:'none'}}>
                <HiOutlineUserGroup className={color8} />
                <li className={color12}>Social</li>
            </NavLink>
        </ul>
    )
}

export default Sidebar;