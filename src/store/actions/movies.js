import * as actionTypes from './actionTypes';
import axios from 'axios';
import { API_KEY, PATH_BASE, PATH_DISCOVER, PATH_MOVIE, PATH_SEARCH, PATH_PAGE, PATH_ADULT, PATH_LANGUE } from  '../../containers/Home/MoviesList/api';

export const initialise = () => {
    return {
        type: actionTypes.INITIALISE
    }
};

export const initialiseFiltres = () => {
    return {
        type: actionTypes.INITIALISE_FILTRES
    }
};

export const initialiseTextSearch = () => {
    return {
        type: actionTypes.INITIALISE_TEXTSEARCH
    }
};

export const filtres = (filtres) => {
    return {
        type: actionTypes.FILTRES,
        filtres: filtres
    }
};

export const textSearch = (textSearch) => {
    return {
        type: actionTypes.TEXT_SEARCH,
        textSearch: textSearch
    }
};

export const movies = (movies, nbPage, page, next, noResult) => {
    return {
        type: actionTypes.MOVIES,
        newMovies: movies,
        nbPage: nbPage,
        page: page,
        next: next,
        noResult: noResult 
    }
};

export const popularRequest = (page) => {
    return dispatch => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=1e32f5c452c2267d5367589e9864ab1c&language=fr&page=${page}`)
            .then(response => {
                dispatch(movies(response.data.results, response.data.total_pages, page, 'popular'));
            })
            .catch(err => console.log(err));
    }
};

export const filtresRequest = (filtres, page) => {
    return dispatch => {
        let url = `${PATH_BASE}${PATH_DISCOVER}${PATH_MOVIE}${API_KEY}${PATH_PAGE}${page}${PATH_ADULT}${PATH_LANGUE}fr`;
        if (!!filtres.genre.value)
            url += `&with_genres=${filtres.genre.value}`;
        if (!!filtres.years.value)
            url += `&primary_release_year=${filtres.years.value}`;
        if (!!filtres.sortby.value)
            url += `&sort_by=${filtres.sortby.value}`;
        axios.get(url)
            .then(response => {
                dispatch(movies(response.data.results, response.data.total_pages, page, 'filtres'));
            })
            .catch(err => console.log(err));
    }
};

export const textSearchRequest = (textSearch, page) => {
    return dispatch => {
        axios.get(`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}${API_KEY}${PATH_PAGE}${page}${PATH_LANGUE}fr${PATH_ADULT}"&query=${textSearch}`)
            .then(response => {
                let noResult ;
                response.data.total_results === 0 ? noResult = true : noResult = false; 
                dispatch(movies(response.data.results, response.data.total_pages, page, 'textSearch', noResult));
            })
            .catch(err => console.log(err));
    }
};
