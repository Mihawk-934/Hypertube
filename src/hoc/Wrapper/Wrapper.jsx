import React from 'react';
import Social from '../../containers/Auth/Login/Social/Social';

const Wrapper = (props) => (
    <div className="PageAuth">
        <div className="Register">
            <h1 className="login-form-title">{props.title}</h1>
            {props.form}
            {props.social && <Social />}        
        </div>  
    </div> 
)

export default Wrapper