import React from 'react';
import { FaHeart } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Icons = () => {
    return (
        <div className='Icons'>
            <OverlayTrigger  placement='bottom'
                overlay={<Tooltip id='favoris'>Ajouter aux favoris</Tooltip>}>
                <FaHeart className='Fav'/>
            </OverlayTrigger>
            <OverlayTrigger  placement='bottom'
                overlay={<Tooltip id='voir'>A voir plus tard</Tooltip>}>
                <IoIosTime className='Vu'/>
            </OverlayTrigger>
        </div>
    )
}

export default Icons;