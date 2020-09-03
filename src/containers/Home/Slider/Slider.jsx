import React from 'react';
import { Carousel } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Slider.css';

const SliderHome = () => (
    <Carousel className="Slider" indicators={false} controls={false} interval={5000}>
        <Carousel.Item className="SliderItem">
            <img src='https://images8.alphacoders.com/567/567772.jpg' alt="Third slide" />
            <NavLink to="/profil/Social">
                <button>Rejoignez-nous</button>
            </NavLink>
        </Carousel.Item>

        <Carousel.Item className="SliderItem">
            <img className="ImgCarousel" src='https://images2.alphacoders.com/591/thumb-1920-59190.jpg' alt="First slide" />
        </Carousel.Item>

        <Carousel.Item className="SliderItem">
            <img className="ImgCarousel" src='https://images3.alphacoders.com/273/273765.jpg' alt="Third slide" />
        </Carousel.Item>
       
    </Carousel>
)

export default SliderHome;
