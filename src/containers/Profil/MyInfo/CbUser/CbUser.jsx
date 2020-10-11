import React, { useState, useEffect } from 'react';
import Cards from 'react-credit-cards';
import MyButton from '../../../../components/MyButton/MyButton';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-credit-cards/es/styles-compiled.css';
import './CbUser.css';

const CbUser = () => {
    const [ number, setNumber ] = useState('');
    const [ name, setName ] = useState('');
    const [ expiry, setExpiry ] = useState('');
    const [ cvc, setCvc ] = useState('');
    const [ focus, setFocus ] = useState('');
    
    useEffect(() => {
        let idLocal = localStorage.getItem('id')
        axios.get(`https://movies-52928.firebaseio.com/${idLocal}/CarteBleu.json/`)
            .then(response => {
                setCvc(response.data.cvc) 
                setName(response.data.name)   
                setExpiry(response.data.expiry)  
                setNumber(response.data.number)  
            })
            .catch(err => {})
    }, []) 
 
    const handleSubmit = (e) => {
        e.preventDefault(); 
        const data = {
            name: name,
            number: number,
            cvc: cvc,
            expiry: expiry,
         };
        axios.put(`https://movies-52928.firebaseio.com/${localStorage.getItem('id')}/CarteBleu.json/`, data)
            .then(response => {
                toast.success('Carte Bleu mise à jour.', {
                    autoClose: 3000,
                    closeButton: false,
                    className: "toastCss"
                })
            })
            .catch(err => {
                toast.error('Erreur, veuillez ressayer plus tard 😮.', {
                    autoClose: 3000,
                    closeButton: false,
                    className: "toastCss"
                })
            })    
    }

    return (
        <div id="PaymentForm" className="BlockContainer">
            <ToastContainer position="top-center" pauseOnFocusLoss/>
            <div className="TitleBackground">
                <h4 className='h4'>Carte bancaire</h4>
            </div>
            <div className="BlockCbUser">
                <Cards
                    cvc={cvc}
                    expiry={expiry}
                    focused={focus}
                    name={name}
                    number={number}/>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='Duo'>
                    <input className='Input' type="tel" id="number" placeholder="Numero de carte" 
                        onChange={(e) => setNumber(e.target.value)} onFocus={e => setFocus(e.target.id)} 
                        pattern="[0-9]+" title="Veuillez entrer les 16 chiffres de votre carte." 
                        value={number}  minLength="16" maxLength="16" required/>
                </div>
                <div className='Duo'>
                    <input className='Input' type="text" id="name" placeholder="Nom" 
                        onChange={(e) => setName(e.target.value)} onFocus={e => setFocus(e.target.id)} 
                        pattern="^[A-Za-z -]+$" title="please enter letters only" 
                        value={name} minLength="2" maxLength="25" required/>
                </div>
                <div className="blockCvcDate">
                    <div className='Duo'>
                        <input className='Input' type="tel" id="expiry" placeholder="date d'expiration" 
                            onChange={(e) => setExpiry(e.target.value)} onFocus={e => setFocus(e.target.id)} 
                            pattern="[0-9]+" title="Veuillez entrer la date d'expiration de votre carte." 
                            value={expiry} minLength="4" maxLength="4" required/>
                    </div>
                    <div className='Duo'>
                        <input className='Input' type="tel" id="cvc" placeholder="CVC" 
                            onChange={(e) => setCvc(e.target.value)} onFocus={e => setFocus(e.target.id)} 
                            pattern="[0-9]+" title="Veuillez entrer les 3 chiffres CVC de votre carte." 
                            value={cvc} minLength="3" maxLength="3" required/>
                    </div>
                </div>
                <div style={{width: '200px'}}className='Duo'>
                    <MyButton />
                </div>
            </form>
        </div>
    )
}

export default CbUser;