import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  loading: false,
  errorServor: null,
  registerSuccess: false,
  show: false,
  photo: null,
  tchat: false
};

const authStart = (state) => {
  return updateObject( state, {
    error: null, 
    loading: true 
  });
};

const authSuccess = (state, action) => {
  return updateObject( state, { 
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  });
};

const authLogout = (state) => { 
  return updateObject(state, {
    token: null,
    userId: null,
    show: false
  });
};

const errorServor = (state, action) => {
  return updateObject(state, {
    errorServor: action.error 
  });
};

const registerSuccess = (state, action) => {
  return updateObject(state, {
    registerSuccess: action.value
  });
};

const hideToolbarAndFooter = (state) => {
  return updateObject( state, { 
    show: false
  });
};

const showToolbarAndFooter = (state) => {
  return updateObject( state, { 
    show: true
  });
};

const photo = (state, action) => {
  return updateObject(state, {
    photo : action.photo
  });
}

const tchat = (state, action) => {
  return updateObject(state, {
    tchat : action.value
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    case actionTypes.AUTH_ERROR: return errorServor(state, action);
    case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
    case actionTypes.HIDE_TOOLBAR_AND_FOOTER: return hideToolbarAndFooter(state);
    case actionTypes.SHOW_TOOLBAR_AND_FOOTER: return showToolbarAndFooter(state);
    case actionTypes.PHOTO: return photo(state, action);
    case actionTypes.TCHAT: return tchat(state, action);
      default: return state;
  }
};

export default reducer;