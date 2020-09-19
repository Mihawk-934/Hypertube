import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as actions from '../../../../store/actions/index';

const Icons = (props) => {
    const [cart, setCart] = useState(false);

    const dispatch = useDispatch();
    const addTocart = (movie) => { dispatch(actions.addToCart(movie)) };
        const inCart = () => {
        setCart(prev => !prev); 
    }

    useEffect (() => {
        if(cart === true)
            addTocart(props.movie);
        // if (cart === false)
    }, [cart])

    return (
        <div className='Icons'>
            <OverlayTrigger placement='bottom' 
                overlay={<Tooltip id='favoris'>Ajouter aux favoris</Tooltip>}>
                <FaHeart className='Fav'/>
            </OverlayTrigger>
            <OverlayTrigger placement='bottom'
                overlay={<Tooltip id='voir'>Ajouter au panier</Tooltip>}>
                <FaCartPlus className='Vu' onClick={inCart}/>
            </OverlayTrigger>
        </div>
    )
}

export default Icons;