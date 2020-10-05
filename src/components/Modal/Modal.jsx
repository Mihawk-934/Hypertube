import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MyModal = ({showModal, click}) => (
    <Modal show={showModal} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header style={{backgroundColor:'black',color:'white'}}>
            <Modal.Title>Team Netflix</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'black',color:'white'}}>
            <p>Vous devez completer vous information personnel dans votre profil avant de pouvoir profitez de nos services :)</p>
            <p>Cliquez sur le lien ci-dessous vous serez dirigez vers votre page de profil </p>
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:'black',color:'white',display:'flex',justifyContent:'space-around'}}>
            <Button style={{backgroundColor:'red',color:'white', border:'none'}} onClick={click}>Confirmer</Button>
        </Modal.Footer>
    </Modal>
)

export default MyModal;