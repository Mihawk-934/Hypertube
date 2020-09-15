import React from 'react';
import { Link } from 'react-router-dom';
import Social from '../../containers/Auth/Login/Social/Social';
import Logo from '../Layout/Toolbar/Logo/Logo';
import './Wrapper.css';

const Wrapper = (props) => (
    <div className="PageAuth">
        <div className="toolbarAuth">
            <div className="LogoRegister">
                <Logo/>
            </div>
            { props.title === 'Inscription' && <Link to="/login"><button className="buttonLogin">S'identifier</button></Link> }  
        </div>
        <div style={{width:'100%', margin:'auto'}}>
            { props.title === 'Inscription' &&
                <>
                    <h1 className="h1Wrapper">Films, dessin animé et bien plus en illimité.</h1>
                    <h2 className="h2Wrapper">Prêt à regarder Netflix ? Saisissez votre adresse e-mail et votre mot de passe pour vous inscrire.</h2>
                </>
            }
            <div className="Register" style={{margin:'auto'}}>
                <h1 className="login-form-title">{props.title}</h1>
                {props.form}
                {props.social && <Social />}        
            </div>  
        </div>
    </div> 
)

export default Wrapper