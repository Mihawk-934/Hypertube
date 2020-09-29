import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

const MyOrder = () => {
    const [orderUser, setOrderUser] = useState([]);
    useEffect(() => {
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/Order.json/`)
        .then(res => {
            console.log(res.data)
            if (res.data !== null) 
                setOrderUser(res.data)
        })
        .catch(err => {})   
    }, [])

    let order = orderUser.map(order=> {
        return (
            <div key={order.numberOrder}className="BlockContainer">
                <div className="TitleBackground">
                    <h4 className='h4'>Commande {order.numberOrder} du {order.date}</h4>
                </div>
                <Carousel className="Slider" indicators={order.films.length > 1 ? true : false} controls={order.films.length > 1 ? true : false} interval={5000}>
                    {console.log(order.films.length)}
                    {order.films.map(movie => {
                        return (
                            <Carousel.Item className="SliderItem" key={movie.id}>
                                <img className="imgMovie" src={`https://image.tmdb.org/t/p/w500${movie.img}`} alt={movie.id} />
                            </Carousel.Item>)
                    })}
                 </Carousel>
            </div>
            )
        }
    )

    return (<>{order}</>)
}

export default MyOrder;