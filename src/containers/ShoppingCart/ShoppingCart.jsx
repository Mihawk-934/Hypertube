import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiArrowLeftSFill, RiArrowRightSFill } from 'react-icons/ri';
import * as actions from '../../store/actions/index';
import { useHistory } from 'react-router-dom';
import './ShoppingCart.css';
import axios from 'axios';

const ShoppingCart = () => {
    const movies = useSelector(state => state.cart.cart);
    const total = useSelector(state => state.cart.total);
    const qte = useSelector(state => state.cart.qte);
    const history = useHistory();
    const dispatch = useDispatch();
    const resetCart = () => { dispatch(actions.resetCart()) };
    const removeProduct = (id) => { dispatch(actions.removeToCart(id)) };
    const decrease = (id) => { dispatch(actions.decrease(id)) };
    const increase = (id) => { dispatch(actions.increase(id)) };
    const getTotals = () => { dispatch(actions.getTotals()) };
    const [orderUser, setOrderUser] = useState([]);

    useEffect(() => {
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/Order.json/`)
        .then(res =>setOrderUser(res.data))
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        getTotals();
    })

    const handleSubmit = () => {
        let films = JSON.parse(localStorage.getItem('Panier'))
        let total = JSON.parse(localStorage.getItem("total"))
        let qte = JSON.parse(localStorage.getItem("qte"))
        let tab = { films, total, qte };
        let newOrder;
        orderUser === null ? newOrder = [] : newOrder = orderUser;
        newOrder.push(tab)
        axios.put(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/Order.json/`,newOrder)
        .then(response => {
            // resetCart();
            localStorage.setItem('numOrder', Math.floor(Math.random() * Math.floor(1000000)))
            localStorage.setItem('commandeSuccess', true);
            history.push('/confirmorder')
            //console.log('userrr//////',response.data)
        })
        .catch(err => {
             console.log('DIDMOUNT',err)
        })

        const templateId = 'template_k9mcneq';
        sendFeedback(templateId, {message_html: 'this.state.feedback', from_name: 'this.state.name', reply_to: 'mehdielkaddouri@gmail.com'})
    }

    const sendFeedback = (templateId, variables) => {
        window.emailjs.send('123456789', templateId,variables)
            .then(res => {
                console.log('Email successfully sent!')
            })
            .catch(err => {
                console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)
            })
    }
      

    let cart = (
        <>
            {movies.map(movie => (
                <li className="liMovie" key={movie.id}>
                    <img className="imgMovie" src={`https://image.tmdb.org/t/p/w500${movie.img}`} alt={movie.id}
                        onClick={() => history.push(`/movie/${movie.id}`)}/>
                    <div className="infoMovie">
                        <p className='titleMovie'>{movie.title}</p>
                        <p className='pMovie'>Note {movie.note}/10</p>
                        <p className='pMovie'>Durée {movie.duree} min</p>
                        <div className="qteMovie">
                            <p className='pMovie'>Quantité </p>
                            <RiArrowLeftSFill className="qteIcon" onClick={() => movie.qte === 1 ? removeProduct(movie.id) : decrease(movie.id)} /> 
                            <p className='pMovie'>{movie.qte}</p>
                            <RiArrowRightSFill className="qteIcon" onClick={() => increase(movie.id)} />
                        </div>
                        <p className='deleteMovie' onClick={() => removeProduct(movie.id)}>Supprimer</p>
                    </div>
                    <div className="priceMovie">
                        <p className="price">{movie.price} €</p> 
                    </div>
                </li>))
            }
        </>  
    )

    if (movies.length === 0)
        cart = <p className="cartEmpty">Il n'y a aucun article dans votre panier.</p>
  
    return (
        <div className="PageCart">
            <div className="Cart">
                <ul className="GaucheCart" style={{padding:'0'}}>
                    <h4 className="titlePanier">Panier</h4>
                    <div style={{textAlign:'center'}}>
                        <p className="window1100">{qte} Article{qte > 1 && <span>s</span>} | {total} €</p>
                    </div>
                    {cart} 
                    {movies.length > 1 && <p className="buttonClear" onClick={resetCart}>Vider le Panier</p>}
                </ul>
                <div className="DroiteCart"> 
                    <h4 className="titleRecap">Récapitulatif</h4>
                    <div className="Recapitulatif">
                        <div className="rubriqueRecapitulatif">
                            <p className="infoGauche">Nombre d'articles</p>
                            <p className="infoDroite">{qte}</p>
                        </div>
                        <div className="rubriqueRecapitulatif">
                            <p className="infoGauche">Date de prise en charge et d'expédition estimée</p>
                            <p className="infoDroite" style={{textDecoration:'line-through'}}> 0 € </p>
                        </div>
                        <p style={{textAlign:'center', fontStyle: 'italic'}}>Expedition offerte jusqu'au 31/12/2020</p>
                        <div className='totalPrice'>
                            <p className="totalPriceGauche">Total</p>
                            <p className="totalPriceDroite">{total} €</p>
                        </div>
                    </div>
                    <div className='blockButton'>
                        <button className="buttonPaiment" disabled={qte === 0 ? true : false } onClick={()=>handleSubmit()}>Paiement</button>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ShoppingCart;