import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import './Profil.css'

const MyProfil = ({child}) =>  (
    <div className="PageProfil">
        <div className="NavProfil">
            <div className="MyAccount">
                Mon Compte
            </div>
            <Sidebar />
        </div>    
        <div className='Children'>
            {child}
        </div>
    </div>
);


export default MyProfil;