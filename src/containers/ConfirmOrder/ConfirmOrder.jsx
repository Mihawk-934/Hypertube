import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as actions from '../../store/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from '3d-react-carousal';

const ConfirmOrder = () => {
    let order = 'FUWTS' + localStorage.getItem('numOrder');
    const [adresse, setAdresse] = useState('')
    const dispatch = useDispatch();
    const resetCart = () => { dispatch(actions.resetCart()) };
    const movies = useSelector(state => state.cart.cart);
    useEffect(() => {
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/user.json/`)
            .then(response => {setAdresse(response.data.address) })
            .catch(err => console.log(err))  
        return (() => {
            resetCart();
            localStorage.removeItem('Panier')
        }) 
    }, [])

    const slides = movies.map(movie => (<img src={`https://image.tmdb.org/t/p/original/${movie.img}`} className='ImgMyList' alt={movie.id} key={movie.id}/>     ));

    return (
        <div style={{minHeight:'100vh', width:'65%', margin:'auto', marginTop:'50px'}}>
            <div style={{textAlign:'center'}}>
                <img alt="good" src='https://www.welovebuzz.com/wp-content/uploads/2019/11/giphy-5-8.gif' style={{borderRadius:'50%'}}/>
            </div>
            <h1 style={{marginTop:'50px'}}>Merci, nous avons reçu votre commande <br/>nᵒ {order}.</h1>
            <p style={{marginTop:'50px'}}>Veuilez consulter votre messagerie pour obtenir la confirmation de commande, ainsi que tout les details correspond a votre achat.</p>
            <p>Vous avez dorenavant la possibilite d'acceder a vos films dans votre espace perso.</p>
            <p>Facture livrer à l'adresse suivante : {adresse}.</p>
            <p style={{marginBottom:'100px'}}>Recapitulatif des fils de  votre commande:</p>
            <div className="BlockMyList">
                <Carousel slides={slides} autoplay={true} interval={3000}/>
            </div>
        </div>
    )
}
export default ConfirmOrder; 