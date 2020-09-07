import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    cart: [
        {
            title: 'FILM 1',
            price: 1000,
            id: 1,
            qte : 1
        },
        {
            title: 'FILM 2',
            price: 2000,
            id: 2,
            qte: 1
        },
        {
            title: 'FILM 3',
            price: 3000,
            id: 3,
            qte: 1
        },
        {
            title: 'FILM 4',
            price: 4000,
            id: 4,
            qte: 1
        },
    ],
    total: 0,
    qte: 0
};

const addToCart = (state, action) => {
    console.log(action)
    let tab= [...state.cart];
    let value = {
        title: action.movie.title,
        price: 1000,
        id: action.movie.id,
        qte : 1
    }
    console.log(value);
    console.log(tab)
    tab.push(value)
  return updateObject( state, { cart: tab
  })
}

const removeToCart = (state, action) => {
    return updateObject( state, { 
        cart: state.cart.filter((cartItem) => cartItem.id !== action.id)
    })
}

const resetCart = (state ) => {
    return updateObject( state, { 
      cart: []
    })
}

const increase = (state, action) => {
    let tempCart = state.cart.map(cartItem => {
        if (cartItem.id === action.id)
            cartItem = { ...cartItem, qte: cartItem.qte + 1 };
        return cartItem;
    })
    return { ...state, cart: tempCart }
}

const decrease = (state, action) => {
    let tempCart = state.cart.map(cartItem => {
        if (cartItem.id === action.id)
            cartItem = { ...cartItem, qte: cartItem.qte - 1 };
        return cartItem;
    })
    return { ...state, cart: tempCart }
}

const getTotals = (state) => {
    let { total, qte } = state.cart.reduce(
        (cartTotal, cartItem) => {
            const itemTotal = cartItem.price * cartItem.qte;
            cartTotal.total += itemTotal;
            cartTotal.qte += cartItem.qte;
            return cartTotal;
        },
        {
            total: 0,
            qte: 0
        }
    );
    total = parseFloat(total.toFixed(2));

    return {...state, total, qte}
}

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.ADD_TO_CART: return addToCart(state, action);
    case actionTypes.REMOVE_TO_CART: return removeToCart(state, action);
    case actionTypes.RESET_CART: return resetCart(state, action);
    case actionTypes.INCREASE: return increase(state, action);
    case actionTypes.DECREASE: return decrease(state, action);
    case actionTypes.GET_TOTAL: return getTotals(state);
    default: return state;
  }
}; 

export default reducer;