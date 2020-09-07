import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './ShoppingCart.css';
import * as actions from '../../store/actions/index';

const ShoppingCart = () => {
    const movies = useSelector(state => state.cart.cart);
    const total = useSelector(state => state.cart.total);

    const dispatch = useDispatch();
    const resetCart = () => { dispatch(actions.resetCart()) };
    const removeProduct = (id) => { dispatch(actions.removeToCart(id)) };
    const decrease = (id) => { dispatch(actions.decrease(id)) };
    const increase = (id) => { dispatch(actions.increase(id)) };
    const getTotals = () => { dispatch(actions.getTotals()) };

    useEffect(() => {
        getTotals();
    })

    let cart = (
        <>
            <ul style={{padding:'0'}}>
                {movies.map(movie => (
                    <li className="BlockFilm" key={movie.id}>
                        {/* <img style={{width:'150px', height:'200px'}} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.id}/> */}
                        <div className="InfoFilm">
                            <h4 style={{color:'grey'}}>{movie.title} id ={movie.id}</h4>
                            <p style={{color:'black', fontWeight:'bold'}}>{movie.price}$</p>
                        </div>
                        <div>
                            <button onClick={() => increase(movie.id)}>+</button>
                            <p style={{color:'black'}}>{movie.qte}</p>
                            <button onClick={() => movie.qte === 1 ? removeProduct(movie.id) : decrease(movie.id)}>-</button>
                            <AiOutlineCloseCircle className="DeleteProduct" onClick={() => removeProduct(movie.id)}/>
                        </div>
                    </li>))
                }
            </ul>
                <div className="Checkout">
                <p>Total: {total}$</p>
                <button>Valider</button>
                <button onClick={resetCart}>VIDER LE PANIER</button>
            </div>
        </>
    )

    if (movies.length === 0) {
        cart = <p style={{color:'black'}}>Is currently empty</p>
    }
  
    return (
        <div className="PageCart">
            <div className="BlockCart">
                <h1 className='Title'>Mon Panier <span style={{fontStyle:'italic'}}>({movies.length} articles)</span></h1>
                {cart}   
            </div>
        </div>
    )
}

export default ShoppingCart;