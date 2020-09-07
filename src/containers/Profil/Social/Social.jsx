import React, { useState } from 'react';
import Switch from "react-switch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Social.css';

const Social = () => {
    const [btnMembre, setBtnMembre] = useState(false);
    const [btnNewsletter, setBtnNewsletter] = useState(false);

    const handleChange = (e, id) => {
        if (id === 'membre') {
            setBtnMembre(prev => !prev);
            btnMembre ? toast.success("Membre TRUE") : toast.error("Membre FALSE");
        }
        else if (id === 'newsletter') {
            setBtnNewsletter(prev => !prev);
            btnNewsletter ? toast.success("News TRUE") : toast.error("News FALSE");
        }
    }

    return (
        <div className='PageMyInfo'>
            <h1 className='Title'>Social</h1>
            <div className="BlockContainer">
                <div className="TitleBackground">
                    <h4 className='h4'>Rejoignez-nous</h4>
                </div>
                <div className="BlockSocial1">
                    <div className="GaucheSocial">
                        <h4 className="h4Social"> Avantages à devenir membre :</h4>
                        <ul style={{padding:'0'}}>
                            <li className="liSocial">Prenez part aux discussions sur les films et séries </li>
                            <li className="liSocial">Contribuez à améliorer les informations de notre base de données.</li>
                            <li className="liSocial">Profitez des dernieres infos et exclu grace a un communauté reactive</li>
                            <li className="liSocial">Profitez des dernieres infos et exclu grace a un communauté reactive</li>
                        </ul>
                    </div>
                    <div className="Switch">
                        <Switch onChange={(e) => handleChange(e,'membre')} checked={btnMembre}/>
                    </div>
                </div>
            </div>

            <div className="BlockContainer">
                <div className="TitleBackground">
                    <h4 className='h4'>Newsletter</h4>
                </div>
                <div className="BlockSocial2">
                    <div className="GaucheSocial">
                        <h4 className="h4Social">Avantages à devenir membre :</h4>
                        <ul style={{padding:'0'}}>
                            <li className="liSocial">Info en exlusivité </li>
                            <li className="liSocial">Profitez en exclu des info sur tout les film tendance</li>
                        </ul>
                    </div>
                    <div className="Switch">
                        <Switch onChange={(e) => handleChange(e,'newsletter')} checked={btnNewsletter}/>
                        <ToastContainer position="top-center" pauseOnFocusLoss type="dark"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Social;