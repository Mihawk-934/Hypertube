import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import MyButton from '../../../../components/MyButton/MyButton';
import 'react-credit-cards/es/styles-compiled.css';
import './CbUser.css';

const CbUser = () => {
    const [ number, setNumber ] = useState('');
    const [ name, setName ] = useState('');
    const [ expiry, setExpiry ] = useState('');
    const [ cvc, setCvc ] = useState('');
    const [ focus, setFocus ] = useState('');
    
    return (
        <div className="BlockContainer">
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
            <form>
                <div className='Duo'>
                    <input className='Input' type="tel" id="number" placeholder="Numero de carte" 
                        value={number} title= "pas de caracteres speciaux"
                        onChange={(e) => setNumber(e.target.value)} onFocus={e => setFocus(e.target.id)} 
                        minLength="16" maxLength="16"
                        pattern="[0-9]+" title="Veuillez entrer les 16 chiffres de votre carte." 
                        required/>
                </div>
                <div className='Duo'>
                    <input className='Input' type="text" id="name" placeholder="Nom" 
                        value={name} title= "pas de caracteres speciaux"
                        onChange={(e) => setName(e.target.value)} onFocus={e => setFocus(e.target.id)} 
                        minLength="2" maxLength="25"
                        pattern="^[A-Za-z -]+$" title="please enter letters only" 
                        required/>
                </div>
                <div className="blockCvcDate">
                    <div className='Duo'>
                        <input className='Input' type="tel" id="expiry" placeholder="date d'expiration" 
                            value={expiry} title= "pas de caracteres speciaux"
                            onChange={(e) => setExpiry(e.target.value)} onFocus={e => setFocus(e.target.id)} 
                            minLength="4" maxLength="4"
                            pattern="[0-9]+" title="Veuillez entrer la date d'expiration de votre carte." 
                            required/>
                    </div>
                    <div className='Duo'>
                        <input className='Input' type="tel" id="cvc" placeholder="CVC" 
                            value={cvc} title= "pas de caracteres speciaux"
                            onChange={(e) => setCvc(e.target.value)} onFocus={e => setFocus(e.target.id)} 
                            minLength="3" maxLength="3"
                            pattern="[0-9]+" title="Veuillez entrer les 3 chiffres CVC de votre carte." 
                            required/>
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