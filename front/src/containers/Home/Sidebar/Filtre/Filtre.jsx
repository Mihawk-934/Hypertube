import React, { Component } from 'react';
import Select from 'react-select';
import './Filtre.css';
import * as actions from '../../../../store/actions/index';
import { connect } from 'react-redux';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { BsArrowClockwise } from "react-icons/bs";

const optionsGenre = [
  { value: '28', label: 'Action' },
  { value: '16', label: 'Animation' },
  { value: '12', label: 'Aventure' },
  { value: '35', label: 'Comédie' },
  { value: '80', label: 'Crime' },
  { value: '99', label: 'Documentaire' },
  { value: '18', label: 'Drame' },
  { value: '10751', label: 'Familial' },
  { value: '14', label: 'Fantastique' },
  { value: '36', label: 'Histoire' },
  { value: '27', label: 'Horreur' },
  { value: '10402', label: 'Musique' },
  { value: '9648', label: 'Mystére' },
  { value: '10749', label: 'Romance' },
  { value: '878', label: 'Science-fiction' },
  { value: '10770', label: 'Téléfilm' },
  { value: '53', label: 'Thriller' },
  { value: '10752', label: 'Guerre' },
  { value: '37', label: 'Western' }, 
];

const optionsSortBy = [
  { value: 'popularity.desc', label: 'Popularité desc' },
  { value: 'popularity.asc', label: 'Popularité asc' },
  { value: 'vote_average.desc', label: 'Note desc' },
  { value: 'vote_average.asc', label: 'Note asc' },
];

const optionsYears = [];
  for (let i = 1960; i <= 2020; i++) 
    optionsYears.push({ value: i, label: i });

class Categrories extends Component {
  handleChange = (value, id) => {
    let filtres = { ...this.props.filtres };
    filtres[id] = value;
    this.props.actionFiltre(filtres);
  };

  reset = () => {
    if (this.props.filtres.genre.value !== null || this.props.filtres.years.value !== null || this.props.filtres.sortby.value !== null) {
      this.props.initialiseFiltres();
      if (this.props.textSearch === '') {
        this.props.initialise(1);
        this.props.popularRequest(1);
      }
    }
  }

  render() {
    const customStyles=  {
      control: () => ({
        display:"flex",
        backgroundColor:"black",
        marginRight:"15px",
        marginLeft:"15px",
        width:'200px',
        marginTop:"30px"
      }),
      placeholder: () => ({
        color: "white"
      }),
      option: (provided, state) => ({
        ...provided,
        display: 'flex',
        color: 'white',
        fontWeight: state.isSelected ? 'bold' : null,
        backgroundColor: state.isSelected ? 'grey' : 'black',
        width:'100%',
        '&:hover': {
          backgroundColor: 'red'
        }
      }),
      singleValue: () => ({
        color: 'white',
        widht:"100%"
      }),
    }
 
    return (
      <div className="Filtres">
          <Select
            className="Filtres2"
            styles={customStyles}
            value={this.props.filtres.genre}
            placeholder= "Genre"
            onChange={(value) => this.handleChange(value, "genre")}
            options={optionsGenre}
          />
          <Select
            className="Filtres2"
            styles={customStyles}
            value={this.props.filtres.years}
            placeholder="Annee"
            onChange={(value) => this.handleChange(value, "years")}
            options={optionsYears}
          />
          <Select
            className="Filtres2"
            styles={customStyles}
            value={this.props.filtres.sortby}
            placeholder="Trier par"
            onChange={(value) => this.handleChange(value, "sortby")}
            options={optionsSortBy}
          />     
          <OverlayTrigger className="Filtres2" placement='bottom' overlay={<Tooltip id='favoris'>Reset Filtres</Tooltip>}>
            <BsArrowClockwise className="Reset" onClick={this.reset}/>
          </OverlayTrigger>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    textSearch: state.movies.textSearch,
    filtres: state.movies.filtres
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initialise: (value) => dispatch(actions.initialise(value)),
    initialiseFiltres: () => dispatch(actions.initialiseFiltres()),
    actionFiltre: (filtres) => dispatch(actions.filtres(filtres)),
    popularRequest: (page) => dispatch(actions.popularRequest(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (Categrories);