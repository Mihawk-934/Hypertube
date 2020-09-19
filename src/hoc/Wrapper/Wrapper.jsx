import React from 'react';
import { Link } from 'react-router-dom';
import Social from '../../containers/Auth/Login/Social/Social';
import Logo from '../Layout/Toolbar/Logo/Logo';
import './Wrapper.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Wrapper = (props) => {

    useEffect (() => {
        Aos.init();
    }, [])

    return (
        
        <div className="PageAuth">
            <div className="toolbarAuth">
                <div data-aos="fade-down" 
                    data-aos-delay= { props.title === 'Inscription' ? "1500" : '0'}
                    data-aos-duration="500"
                    className="LogoRegister">
                    <Logo/>
                </div>
                { props.title === 'Inscription' && 
                    <Link to="/">
                        <button data-aos="fade-down" data-aos-delay="1500" data-aos-duration="500" className="buttonLogin">S'identifier</button>
                    </Link> }  
            </div>
            <div style={{width:'100%', margin:'auto'}}>
                { props.title === 'Inscription' &&
                    <>
                        <h1 data-aos-delay="1000" data-aos="fade-down"data-aos-duration="500" className="h1Wrapper">Films, séries TV et bien plus en illimité.</h1>
                        <h2 data-aos-delay="500" data-aos="fade-down" data-aos-duration="500" className="h2Wrapper">Prêt à regarder Netflix ? Saisissez votre adresse e-mail et votre mot de passe pour vous inscrire.</h2>
                    </>
                }
                <div  data-aos="fade-down" data-aos-duration="500" data-aos-offset="100" className="Register" style={{margin:'auto'}}>
                    <h1 className="login-form-title">{props.title}</h1>
                    {props.form}
                    {props.social && <Social />}        
                </div>  
            </div>
        </div> 
    )
}

export default Wrapper