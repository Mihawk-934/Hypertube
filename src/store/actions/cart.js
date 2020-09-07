import * as actionTypes from './actionTypes';
// import axios from 'axios';
// import firebase from '../../fire';

// export const addToCart = () => {
//     return {
//         type: actionTypes.ADD_TO_CART
//     }
// }

export const removeToCart = (id) => {
    return {
        type: actionTypes.REMOVE_TO_CART,
        id: id
    }
}

export const resetCart = () => {
    return {
        type: actionTypes.RESET_CART
    }
}

export const increase = (id) => {
    return {
        type: actionTypes.INCREASE,
        id: id
    }
}

export const decrease = (id, qte) => {
    return {
        type: actionTypes.DECREASE,
        id: id
    }
}

export const getTotals = () => {
    return {
        type: actionTypes.GET_TOTAL
    }
}