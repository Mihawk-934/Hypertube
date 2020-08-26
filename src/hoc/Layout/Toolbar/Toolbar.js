import React from 'react';
import Logo from './Logo/Logo';
import { NavLink } from 'react-router-dom';
import User from '../../../assets/miclaude.png';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { FiLogOut } from "react-icons/fi";
import './Toolbar.css';

const Toolbar = () => {
    return (
        <Navbar collapseOnSelect expand="sm" className="Toolbar" variant="dark">
            <Navbar.Brand><Logo/></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"/>
                <Nav>
                    <NavLink to="/profil" className='NavUser'><Image src={User} className='User' roundedCircle/></NavLink>
                    <NavLink to="/logout" className='NavLogout'><FiLogOut className="Logout"/></NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Toolbar;