import React from 'react';
import Logo from './Logo/Logo';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { FiLogOut } from "react-icons/fi";
import { BsBag } from "react-icons/bs";
import './Toolbar.css';

const Toolbar = () => {
    const url = useSelector(state => state.auth.photo);
    const number = useSelector(state => state.cart.qte);
    let photo;

    if (localStorage.getItem('photo'))
        photo = localStorage.getItem('photo');
    else if (localStorage.getItem('photoPhone'))
        photo= localStorage.getItem('photoPhone');
    else if (url !== null)
        photo = url;
    else 
        photo = 'https://lebackyard.fr/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';

    const logOut = () => {
        localStorage.clear();
        window.location.reload(false);
    }

    return (
        <Navbar collapseOnSelect expand="sm" className="Toolbar" variant="dark" style={{padding:'0'}}>
            <Navbar.Brand style={{padding:'0'}}><Logo/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"/>
                <Nav style={{paddingRight:'10px'}}>
                    <NavLink to="/cart" className='NavIcon'>
                        <BsBag className="Icon"/>
                        <p className="NumberCart">{number > 0 && number}</p>
                    </NavLink>
                    <NavLink to="/profil" className='NavUser'>
                        <Image src={photo} className='User' roundedCircle/>
                    </NavLink>
                    <div onClick={logOut} className='NavIcon'>
                        <FiLogOut className="Icon"/>
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Toolbar;