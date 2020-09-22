export {
    authRegister,
    registerSuccess,
    authLogin,
    authSuccess,
    socialAuth,
    socialTwitter,
    socialFacebook,
    errorServor,
    authCheckState,
    authLogout,
    hideToolbarAndFooter,
    showToolbarAndFooter,
    photo,
    photoUrl
} from './auth';

export {
    movies,
    textSearch,
    filtres,
    popularRequest,
    textSearchRequest,
    filtresRequest,
    initialise,
    initialiseFiltres,
    initialiseTextSearch,
} from './movies'; 

export {
    resetCart,
    addToCart,
    removeToCart,
    increase,
    decrease,
    getTotals
} from './cart';