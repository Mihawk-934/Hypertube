import React from 'react';
import '../MyInfo.css';

const InfoUser = () => {
    return (
        <div className="BlockContainer">
            <div className="TitleBackground">
                <h4 className='h4'>Informations Personelles</h4>
            </div>
            <div className="BlockUserInfo">
                <div className='Duo'>
                    <input className='Input' type="text" id="lastName" placeholder="Nom" />
                    <div className='Error'></div>
                </div>
                <div className='Duo'>
                    <input className='Input' type="text" id="lastName" placeholder="Prenom" />
                    <div className='Error'></div>
                </div>
                <div className='Duo'>
                    <input className='Input' type="text" id="lastName" placeholder="Mail" />
                    <div className='Error'></div>
                </div>
                <div className='Duo'>
                    <input className='Input' type="text" id="lastName" placeholder="Adresse" />
                    <div className='Error'></div>
                </div>

            </div>
        </div>
    )
}

export default InfoUser;