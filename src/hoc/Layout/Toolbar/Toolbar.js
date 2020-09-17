import React from 'react';
import Logo from './Logo/Logo';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { FiLogOut } from "react-icons/fi";
import { RiShoppingBasketLine } from "react-icons/ri";
import './Toolbar.css';

const Toolbar = () => {
    const url = useSelector(state => state.auth.photo);
    let photo;
    if (url !== null)
        photo = url;
    else 
        photo='https://lebackyard.fr/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'

    return (
        <Navbar collapseOnSelect expand="sm" className="Toolbar" variant="dark" style={{padding:'0'}}>
            <Navbar.Brand style={{padding:'0'}}><Logo/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"/>
                <Nav style={{paddingRight:'10px'}}>
                    <NavLink to="/cart" className='NavIcon'>
                        <RiShoppingBasketLine className="Icon"/>
                    </NavLink>
                    <NavLink to="/profil" className='NavUser'>
                        <Image src={photo} className='User' roundedCircle/>
                    </NavLink>
                    <NavLink to="/logout" className='NavIcon'>
                        <FiLogOut className="Icon"/>
                    </NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Toolbar;