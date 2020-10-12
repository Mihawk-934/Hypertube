import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as actions from '../../../../store/actions/index';

const DeleteAccount = () => {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const showAction = () => { dispatch(actions.hideToolbarAndFooter()) };

    const deleteAccount = () => {
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDPBaoPmbCgQfEQNz9VgHt88mGg6Jv4ces',{"idToken": localStorage.getItem('token')}) 
        .then(res =>{
            toast.info('Votre a bien ete supprimer A bientot .', {
                autoClose: 3000,
                closeButton: false,
                className:'toastCss'
            })
            localStorage.clear();
            showAction();
            setModal(false);
            setTimeout(() => {
                window.location.reload(false);
            }, 3000);
        })
        .catch(err => {
            toast.error('Erreur, veuillez vous reconnectez 😮.',  {
                autoClose: 3000,
                closeButton: false,
                className:'toastCss'
            })
        })
    }

    const Annuler = () => {
        setModal(false)
        toast.info('Ouff .', {
            autoClose: 3000,
            closeButton: false,
            className:'toastCss'
        })
    }

    return (
        <>
            { localStorage.getItem('noSocial') && <p style={{textAlign:'center', color:'black', cursor:'pointer'}} onClick={()=>setModal(true)}>Supprimer mon compte</p>}  
            <Modal
                show={modal}
                onHide={() => setModal(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
               >
                <Modal.Header  style={{backgroundColor:'black',color:'white'}}>
                    <Modal.Title>Team Netflix</Modal.Title>
                </Modal.Header>
                <Modal.Body  style={{backgroundColor:'black',color:'white'}}>
                    <p>
                        Nous sommes triste de vous voir partir <br/>
                        Etes vous sur de vouloir supprimer votre compte ?<br/>
                        Cette action entrainera une supression definitive de vos données
                    </p>
                </Modal.Body>
                <Modal.Footer style={{backgroundColor:'black',color:'white',display:'flex',justifyContent:'space-around'}}>
                    <Button style={{backgroundColor:'grey',color:'white', border:'none'}} onClick={Annuler} >Annuler</Button>
                    <Button style={{backgroundColor:'red',color:'white', border:'none'}} onClick={deleteAccount}>Confirmer</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteAccount;