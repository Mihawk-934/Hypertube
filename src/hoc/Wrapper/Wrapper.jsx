import React from 'react';
import Social from '../../containers/Auth/Login/Social/Social';

const Wrapper = (props) => (
    <div className="PageAuth">
        {   props.title === 'Inscription' &&
            <>
                <h1 style={{fontFamily:'Helvetica Neue', fontSize:'50px', width:'600px', textAlign:'center', marginBottom:'50px'}}>Films, séries TV et bien plus en illimité.</h1>
                <h2 style={{fontFamily:'Helvetica Neue',fontWeight:'400', fontSize:'1.2rem' ,width:'500px',textAlign:'center', marginBottom:'50px'}}>Prêt à regarder Netflix ? Saisissez votre adresse e-mail et votre mot de passe pour vous inscrire.</h2>
            </>
        }
        <div className="Register">
            <h1 className="login-form-title">{props.title}</h1>
            {props.form}
            {props.social && <Social />}        
        </div>  
    </div> 
)

export default Wrapper