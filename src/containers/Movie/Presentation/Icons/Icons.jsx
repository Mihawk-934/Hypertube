import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as actions from '../../../../store/actions/index';
// import useStateWithCallback from 'use-state-with-callback';

const Icons = (props) => {
    console.log(props.movie)
    const [cart, setCart] = useState(false);

    const dispatch = useDispatch();
    const addTocart = (movie) => { dispatch(actions.addToCart(movie)) };
    // let [pathname, setPathname] = useStateWithCallback("", ()=> color());
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
                <FaHeart className='Fav' onClick={inCart}/>
            </OverlayTrigger>
            <OverlayTrigger placement='bottom'
                overlay={<Tooltip id='voir'>Ajouter au panier</Tooltip>}>
                <FaCartPlus className='Vu'/>
            </OverlayTrigger>
        </div>
    )
}

export default Icons;