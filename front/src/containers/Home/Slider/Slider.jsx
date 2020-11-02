import React from 'react';
import { Carousel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaMousePointer } from 'react-icons/fa';
import './Slider.css';
import Promo from '../../../assets/promo.png';
import SuperHeros from '../../../assets/avengers.png';
import StarWars from '../../../assets/darkvador.png';

const SliderHome = () => (
    <Carousel className="Slider" indicators={false} controls={false} interval={3000}>
        <Carousel.Item className="SliderItem">
            <img className="ImgCarousel" src={Promo} alt="Promotions" />
        </Carousel.Item>
        <Carousel.Item className="SliderItem">
            <img className="ImgCarousel" src={SuperHeros} alt="Communaute" />
            <NavLink to="/profil/Social">
                <button>Rejoignez la communauté Netflix !</button>
                <FaMousePointer className="Souris"/>
            </NavLink>
        </Carousel.Item>
        <Carousel.Item className="SliderItem">
            <img className="ImgCarousel" src={StarWars} alt="Star Wars" />
        </Carousel.Item>
    </Carousel>
)

export default SliderHome;
