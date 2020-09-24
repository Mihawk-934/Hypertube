import React from 'react';
import { useDispatch } from 'react-redux';
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as actions from '../../../../store/actions/index';

const Icons = (props) => {
    const dispatch = useDispatch();
    const addTocart = (movie) => { dispatch(actions.addToCart(movie)) };

    return (
        <div className='Icons'>
            <OverlayTrigger placement='bottom' 
                overlay={<Tooltip id='favoris'>Ajouter aux favoris</Tooltip>}>
                <FaHeart className='Fav'/>
            </OverlayTrigger>
            <OverlayTrigger placement='bottom'
                overlay={<Tooltip id='voir'>Ajouter au panier</Tooltip>}>
                <FaCartPlus className='Vu' onClick={() => addTocart(props.movie)}/>
            </OverlayTrigger>
        </div>
    )
}

export default Icons;