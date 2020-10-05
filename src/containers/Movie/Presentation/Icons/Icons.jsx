import React from 'react';
import { useDispatch } from 'react-redux';
import { FaCartPlus } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as actions from '../../../../store/actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Icons = (props) => {
    const dispatch = useDispatch();
    const addTocart = (movie) => { dispatch(actions.addToCart(movie)) };

    const addMovie = () => {
        toast.info('Film ajouter au panier.', {
            autoClose: 3000,
            closeButton: false,
            className: "toastCss",
        })
        addTocart(props.movie)
    }

    return (
        <>
            <ToastContainer position="top-center" pauseOnFocusLoss/>
            <div className='Icons'>
                <OverlayTrigger placement='bottom'
                    overlay={<Tooltip id='voir'>Ajouter au panier</Tooltip>}>
                    <FaCartPlus className='Vu' onClick={addMovie}/>
                </OverlayTrigger>
            </div>
        </> 
    )
}

export default Icons;