import React, { useEffect, useState } from 'react';
import Spinner from './Spinner/Spinner';
import DetailsCommand from './DetailsOrder/DetailsOrder';

const ConfirmOrder = () => {
    const [load,setLoad] = useState(true);

    useEffect(() => {
        let timer;
        if (localStorage.getItem('spinner') === null){
            timer = setTimeout(() => {
                setLoad(false)
                localStorage.setItem('spinner',true)
            }, 3000);
        }
        return (() => {
            clearTimeout(timer);
            localStorage.removeItem('spinner');
            localStorage.removeItem('commandeSuccess');
        }) 
    }, [])

    return <>{ load && localStorage.getItem('spinner') === null ? <Spinner /> : <DetailsCommand />}</>
}
export default ConfirmOrder; 