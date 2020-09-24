import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import * as actions from '../../store/actions/index';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from '3d-react-carousal';
import {Spinner} from 'react-bootstrap'

const ConfirmOrder = () => {
    let order = 'FUWTS' + localStorage.getItem('numOrder');
    const [adresse, setAdresse] = useState('')
    const dispatch = useDispatch();

    const resetCart = useCallback(() => { 
        dispatch(actions.resetCart())
    }, [dispatch]);

    const movies = useSelector(state => state.cart.cart);
    const [load,setLoad] = useState(true);

    useEffect(() => {
        let timer;
        if (localStorage.getItem('spinner') === null){
            timer = setTimeout(() => {
                setLoad(false)
                localStorage.setItem('spinner',true)
            }, 5000);
        }
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/user.json/`)
            .then(response => {setAdresse(response.data.address) })
            .catch(err => console.log(err))  
        return (() => {
            resetCart();
            clearTimeout(timer)
            localStorage.removeItem('Panier')
            localStorage.removeItem('spinner')
        }) 
    }, [resetCart])

    const slides = movies.map(movie => (<img src={`https://image.tmdb.org/t/p/original/${movie.img}`} className='ImgMyList' alt={movie.id} key={movie.id}/>     ));

    let show = load === true && localStorage.getItem('spinner')=== null ?
        <div style={{height:'100vh'}}>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}> 
                <Spinner animation="border" style={{height:'200px',width:'200px'}}/>
                <p style={{marginTop:'30px'}}> Veuillez patient , paiment en cours</p>
            </div>
        </div>
    :  
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
    return (
    <>{show}</>
    )
}
export default ConfirmOrder; 