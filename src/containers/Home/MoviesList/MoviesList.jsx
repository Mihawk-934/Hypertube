import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import "./MoviesList.css";
import MovieItems from "./MoviesItems/MoviesItems";
import * as actions from '../../../store/actions/index';

class MoviesList extends Component {
  state = {
    hasMore: true
  }
 
  componentDidMount () {
    if (this.props.movies.length === 0) 
      this.newMovie();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.filtres !== this.props.filtres && 
      (this.props.filtres.genre.value !== null || this.props.filtres.years.value !== null || this.props.filtres.sortby.value !== null)) {
      this.props.initialise();
      this.props.initialiseTextSearch();
      this.props.filtresRequest(this.props.filtres, 1);
    }
    else if (prevProps.textSearch !== this.props.textSearch 
      && (this.props.textSearch !== '')) {
      this.props.initialise();
      this.props.initialiseFiltres();
      this.props.textSearchRequest(this.props.textSearch, 1);
    }
    else if ((this.props.filtres.genre.value === null && this.props.filtres.years.value === null && this.props.filtres.sortby.value === null) 
      && (this.props.textSearch === '' && prevProps.textSearch !== this.props.textSearch)) {
      this.props.initialise();
      this.props.popularRequest(1);
    }
  }

  newMovie = () => {
    if (
      // this.props.nbPage !== 0 && 
      this.props.page > this.props.nbPage) 
      this.setState({ hasMore: false });
    else if (this.props.next === 'filtres')
      this.props.filtresRequest(this.props.filtres, this.props.page + 1);
    else if (this.props.next === 'textSearch')
      this.props.textSearchRequest(this.props.textSearch, this.props.page + 1); 
    else if (this.props.next === 'popular' || this.props.next === null)
      this.props.popularRequest(this.props.page + 1);
  };

  render() {
    let movies = null;
    if (this.props.movies !== null && this.props.movies.length > 0) 
      movies = <MovieItems movies={this.props.movies} clicked={() => this.clicked()}/>
    if (this.props.noResult)
      movies = <p style={{ color: "white" }}>Il y a 0 resultat.</p>

    return (
      <div className="block">
        <InfiniteScroll
          dataLength={this.props.movies.length}
          next={this.newMovie}
          hasMore={this.state.hasMore}>
          {movies}
        </InfiniteScroll>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    page: state.movies.page,
    nbPage: state.movies.nbPage,
    filtres: state.movies.filtres,
    textSearch: state.movies.textSearch,
    movies: state.movies.movies,
    next: state.movies.next,
    noResult: state.movies.noResult
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initialise: () => dispatch(actions.initialise()),
    initialiseFiltres: () => dispatch(actions.initialiseFiltres()),
    initialiseTextSearch: () => dispatch(actions.initialiseTextSearch()),
    popularRequest: (page) => dispatch(actions.popularRequest(page)),
    filtresRequest: (filtres, page) => dispatch(actions.filtresRequest(filtres, page)),
    textSearchRequest: (textSearch, page)=> dispatch(actions.textSearchRequest(textSearch, page))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);