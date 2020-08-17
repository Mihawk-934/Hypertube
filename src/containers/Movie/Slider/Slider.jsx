import React from "react";
import Slider from 'react-slick';
import { withRouter } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from 'react-bootstrap';
import './Slider.css';

const SimpleSlider = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000
  };

  let sliderItems = props.similar.length === 0 ? null : (
    <>
      <h3>Films similaires :</h3>
      <Slider {...settings} >
        {
          props.similar.map(movie => {
            return (
              <div key={movie.id} className='Image' onClick={() => props.history.push(`/movie/${movie.id}`)}>
                <Image style={{width:"100%", height:"400px"}} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='lol' />
              </div>
            )
          })
        }
      </Slider>
    </>
  );
  
  return (
    <>
      {sliderItems}
    </>
  );
}

export default withRouter(SimpleSlider);