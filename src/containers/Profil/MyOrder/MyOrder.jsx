import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from '../../Movie/Slider/Slider';

const MyOrder = () => {
    const [orderUser, setOrderUser] = useState([]);
    useEffect(() => {
        axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/Order.json/`)
        .then(res => {
            console.log(res.data)
            if (res.data !== null) 
                setOrderUser(res.data)
        })
        .catch(err => {}
            // console.log(err)
        )   
    }, [])

    let order = orderUser.map(order=> {
        return (
            <div key={order.numberOrder}className="BlockContainer">
                <div className="TitleBackground">
                    <h4 className='h4'>Commande {order.numberOrder}</h4>
                </div>
                <Slider similar={order.films}/>
                {/* <div>
                    {order.films.map(movie => {
                        return (
                            <img className="imgMovie" src={`https://image.tmdb.org/t/p/w500${movie.img}`} alt={movie.id} key={movie.id}/>
                        )
                    })}
                </div> */}
            </div>
            )
        }
    )

    return (<>{order}</>)
}

export default MyOrder;