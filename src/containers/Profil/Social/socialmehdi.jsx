import React, { useState, useEffect } from 'react';
import Switch from "react-switch";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Social.css';
import axios from 'axios';

const Social = () => {
    const [checknews,setCheckNews] = useState(false)
    const [checkSocial,setCheckSocial] = useState(false)
    const [name,setName] = useState(null)
    const [show,setShow] = useState(false)

    useEffect(()=>{
        console.log('DIDMOUNTTTTT-->')
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`)
        .then(response => {
            setCheckSocial(response.data.social);
        }).catch(error => {
            //console.log('MAILL//',error)
        })
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`)
        .then(response => {
            setCheckNews(response.data.newsletter);
        }).catch(error => {
            //console.log('MAILL//',error)
        })
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/user.json/`)
        .then(response => {setName(response.data.name) })
        .catch(err => {})  
    },[])


    useEffect(()=> {
        console.log('DIDUPDATE->')
        const dataTrue = {social:true};
        const dataFalse = {social:false};
      
     checkSocial ? axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`,dataTrue) : axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`,dataFalse);
    
    },[checkSocial])

    useEffect(()=> {
        console.log('DIDUPDATE-> 111')
        const dataTrue1 = {newsletter:true};
        const dataFalse1 = {newsletter:false};
        checknews ? axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`,dataTrue1) : axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`,dataFalse1);

    },[checknews])

    

    const handleChange = (id) => {
    if(name){
        if (id === 'membre') {
            setCheckSocial(prev => !prev);
        }
        else if (id === 'newsletter') {
            setCheckNews(prev => !prev);
        }
    } 
    else 
        setShow(true)    
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
                        <Switch onChange={() => handleChange('membre')}/>
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
                        <Switch onChange={() => handleChange('newsletter')} />
                        <ToastContainer transition={Zoom} position="top-center" pauseOnFocusLoss type="dark"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Social;