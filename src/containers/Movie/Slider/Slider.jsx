import React from "react";
import Slider from 'react-slick';
import { withRouter } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slider.css';

const SimpleSlider = (props) => {
  var settings = {
    width: '90%',
    dots: true,
    infinite: true,
    slidesToShow: props.nbSlide,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div style={{width:'92%', margin:'auto'}}>
      <h2 className={props.titleCss}>{props.title}</h2>
      <Slider {...settings}>
        {
          props.similar.map(movie => {
            return (
              <div key={movie.id} className='blockImage' style={{width:'50px'} }onClick={() => props.history.push(`/movie/${movie.id}`)}>
                <Image className={props.image} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path || movie.img}`} alt={movie.title} />
              </div>
            )
          })
        }
      </Slider>
    </div>
  );
}

export default withRouter(SimpleSlider);