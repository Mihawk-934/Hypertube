import React  from 'react';
import Form from './Form/Form';
import Mail from './Mail/Mail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './InfoUser.css';

const InfoUser = () => {
   
    return (
        <>
            <ToastContainer position="top-center" pauseOnFocusLoss />
            { localStorage.getItem('noSocial') && <Mail/>}
            <Form/>
        </>
    )
}

export default InfoUser; 