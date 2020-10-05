import React from 'react';
import { Spinner } from 'react-bootstrap';
import './Spinner.css';

const MySpinner = (props) => {
    return (
        <div className={props.css}> 
            <Spinner animation="border" style={{height:'200px',width:'200px'}}/>
            <p style={{marginTop:'30px'}}>{props.txt}</p>
        </div>   
    )
}

export default MySpinner; 