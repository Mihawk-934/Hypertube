import React, { useState, useEffect, useCallback } from 'react';
import MyModal from '../../../components/Modal/Modal';
import Switch from "react-switch";
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './Social.css';
import  * as actions from '../../../store/actions/index';

const Social = () => {
    const [btnMembre, setBtnMembre] = useState(false);
    const [btnNewsletter, setBtnNewsletter] = useState(false);
    const [ok, setOk] = useState(false);
    const [ok1, setOk1] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [name,setName] = useState(null)
    const history = useHistory();

    const dispatch = useDispatch();
    const tchat = useCallback((value) => { 
        dispatch(actions.tchat(value));
    }, [dispatch]);

    useEffect(()=>{
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`)
            .then(res => { setBtnMembre(res.data.social);})
            .catch(err => {})
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`)
            .then(res => { setBtnNewsletter(res.data.newsletter);})
            .catch(err => {})
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/user.json/`)
            .then(res => {setName(res.data.name)})
            .catch(err => {})
    },[])

    useEffect(() => {
        if (ok) {
            btnMembre ? 
            axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`,{ social : btnMembre })
                .then(res => {
                    toast.success("Nous sommes heureux de vous compter parmis nos membres.", {  className: "toastCss" })
                    tchat(btnMembre)
                })
                .catch(err => {})
            : axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/social.json/`,{ social : btnMembre })
                .then(res => {
                    toast.error("Nous sommes triste de ne plus vous compter parmis nos membres.", {  className: "toastCss" })
                    tchat(btnMembre)
                })
                .catch(err => {})
        } 
        if (ok1) {
            btnNewsletter ? 
            axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`,{ newsletter : btnNewsletter })
                .then(res => toast.success("Vous etes maintenant abonneer a notre newsletter", {  className: "toastCss" }))
                .catch(err => {})
            : axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/newsletter.json/`,{ newsletter : btnNewsletter })
                .then(res => toast.error("Vous etes desabonner a notre newsletter", {  className: "toastCss" }))
                .catch(err => {})
        }
           
    }, [btnMembre, btnNewsletter, ok, ok1]);
    //utiliser useCallbackwithtruc pour thcat();

    const handleChange = (id) => {
        if(name) {
            setOk(true);
            setOk1(true);
            if (id === 'membre') {
                setOk1(false)
                setBtnMembre(prev => !prev);
            }
            else if (id === 'newsletter') {
                setOk(false)
                setBtnNewsletter(prev => !prev);
            }
        }
        else 
            setShowModal(true)   
    }

    return (
        <div className='PageMyInfo'>
            <MyModal click={() => { history.push('/profil')}} showModal={showModal}/>
            <h1 className='Title'>Social</h1>
            <div className="BlockContainer">
                <div className="TitleBackground">
                    <h4 className='h4'>Rejoignez-nous</h4>
                </div>
                <div className="BlockSocial1">
                    <div className="GaucheSocial">
                        <h4 className="h4Social"> Avantages à devenir membre :</h4>
                        <ul style={{padding:'0'}}>
                            <li className="liSocial">Discuter avec les membres de la communauté à travers la tchat instanée</li>
                            <li className="liSocial">Contribuez à améliorer les informations de notre base de données.</li>
                            <li className="liSocial">Profitez des dernieres infos et exclu grace a un communauté reactive</li>
                        </ul>
                    </div>
                    <div className="Switch">
                        <Switch onChange={() => handleChange('membre')} checked={btnMembre}/>
                    </div>
                </div>
            </div>
            <div className="BlockContainer">
                <div className="TitleBackground">
                    <h4 className='h4'>Newsletter</h4>
                </div>
                <div className="BlockSocial2">
                    <div className="GaucheSocial">
                        <h4 className="h4Social">Avantages :</h4>
                        <ul style={{padding:'0'}}>
                            <li className="liSocial">Info en exlusivité </li>
                            <li className="liSocial">Profitez en exclu des info sur tout les film tendance</li>
                        </ul>
                    </div>
                    <div className="Switch">
                        <Switch onChange={() => handleChange('newsletter')} checked={btnNewsletter}/>
                        <ToastContainer transition={Zoom} position="top-center" pauseOnFocusLoss type="dark"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Social;