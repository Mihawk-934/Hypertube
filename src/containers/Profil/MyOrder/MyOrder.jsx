import React, { useEffect, useState } from 'react';
import Slider from '../../Movie/Slider/Slider';
import axios from 'axios';

const MyOrder = () => {
  const [orderUser, setOrderUser] = useState([]);
  useEffect(() => {
    axios.get(`https://movies-27cd5.firebaseio.com/${localStorage.getItem('id')}/Order.json/`)
      .then(res => {
        res.data !== null && setOrderUser(res.data)
      })
      .catch(err => {})   
  }, [])

  let order = orderUser.map(order => (
      <div style={{marginTop:'40px', marginBottom:'30px'}}>
          <Slider similar={order.films} title={`Commande ${order.numberOrder} du ${order.date}`} image='ImageOrder' titleCss='TitleSliderOrder' nbSlide={order.films.length < 4 ? order.films.length : 4}/>  
      </div>
    )
  )

  return (
    <div className='PageMyInfo'>
      <h1 className='Title' style={{marginBottom:'50px'}}>Mes Commandes</h1>
      {order}
    </div>
  )
}

export default MyOrder;