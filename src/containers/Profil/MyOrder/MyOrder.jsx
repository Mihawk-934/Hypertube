import React, { useEffect, useState } from 'react';
import Slider from '../../../components/Slider/Slider';
import axios from 'axios';

const MyOrder = () => {
  const [orderUser, setOrderUser] = useState([]);
  useEffect(() => {
    axios.get(`https://movies-52928.firebaseio.com/${localStorage.getItem('id')}/Order.json/`)
    .then(res => {
      res.data !== null && setOrderUser(res.data)
    })
    .catch(err => {})   
  }, [])

  let order;

  if (orderUser.length === 0)
    order = <p style={{fontStyle: 'italic', color: 'black'}}>Aucune commande.</p>
  
  else {
    order = orderUser.map((order, index) => (
      <div key={index} style={{marginTop:'40px', marginBottom:'30px'}}>
          <Slider similar={order.films} title={`Commande ${order.numberOrder} du ${order.date}`} image='ImageOrder' titleCss='TitleSliderOrder' component='MyOrder'/>  
      </div>)
    )
  }  
  
  return (
    <div className='PageMyInfo'>
      <h1 className='Title' style={{marginBottom:'20px'}}>Historique de commande</h1>
      {order}
    </div>
  )
}

export default MyOrder;