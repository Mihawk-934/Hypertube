import React from 'react';
import Video from '../Video/Video';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import { FaFilm } from "react-icons/fa";
import './Modal.css';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal className="Modal" {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Trailer
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Video id={props.id}/>
            </Modal.Body>
        </Modal>
    );
}

const myModal = (props) => {
    // const [modalShow, setModalShow] = React.useState(false);

    return (
        <ButtonToolbar>
            {/* <Button className='BandeAnnonce' variant="danger" block onClick={() => setModalShow(true)}><FaFilm style={{marginRight:"20px"}}/>Regarder le trailer</Button>
            <MyVerticallyCenteredModal show={modalShow} id={props.id} onHide={() => setModalShow(false)}/> */}
        </ButtonToolbar>
    );
}

export default myModal;