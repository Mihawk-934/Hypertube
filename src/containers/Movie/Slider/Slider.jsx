import React from "react";
import Slider from 'react-slick';
import { withRouter } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from 'react-bootstrap';
import './Slider.css';
import axios from 'axios';
import Aux from '../../../hoc/Aux/Aux';
 
class SimpleSlider extends React.Component {
  state= {
    similarMovie: []
  };

  componentDidMount () {
    if (!!this.props.idMovie) {
      axios.get(`https://api.themoviedb.org/3/movie/${this.props.idMovie}/similar?api_key=1e32f5c452c2267d5367589e9864ab1c&language=fr&page=1`)
        .then(response => this.setState({similarMovie: response.data.results.slice(0, 20)}))
        .catch(error => console.log(error));
    };
  };

  componentDidUpdate (prevProps) {
    if (this.props.idMovie !== prevProps.idMovie && !!this.props.idMovie) {
      axios.get(`https://api.themoviedb.org/3/movie/${this.props.idMovie}/similar?api_key=1e32f5c452c2267d5367589e9864ab1c&language=fr&page=1`)
        .then(response => this.setState({similarMovie: response.data.results.slice(0, 20)}))
        .catch(error => console.log(error));
    };
  };

  clicked = (id) => {
    this.props.history.push(`/movie/${id}`);
  };

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4
    };

    let sliderItems = this.state.similarMovie.length === 0 ? null : (
      <Aux>
        <h3 className='pl-3'>Films similaires : </h3>
        <Slider {...settings}>
          {
            this.state.similarMovie.map(movie => {
              return (
                <div key={movie.id} className='Image' onClick={() => this.clicked(movie.id)}>
                  <Image style={{width:"100%", height:"auto"}} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='lol' />
                </div>
              )
            })
          }
        </Slider>
      </Aux>
    );
    
    return (
      <>
        {sliderItems}
      </>
    );
  }
}

export default withRouter(SimpleSlider);