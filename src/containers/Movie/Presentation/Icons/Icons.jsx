import React from 'react';
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Icons = () => {

    return (
        <div className='Icons'>
            <OverlayTrigger  placement='bottom'
                overlay={<Tooltip id='favoris'>Ajouter aux favoris</Tooltip>}>
                <FaHeart className='Fav'/>
            </OverlayTrigger>
            <OverlayTrigger  placement='bottom'
                overlay={<Tooltip id='voir'>Ajouter au panier</Tooltip>}>
                <FaCartPlus className='Vu'/>
            </OverlayTrigger>
        </div>
    )
}

export default Icons;