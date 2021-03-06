import * as actionTypes from './actionTypes';
import axios from 'axios';
import firebase from '../../fire';

export const hideToolbarAndFooter = () => {
    return {
        type: actionTypes.HIDE_TOOLBAR_AND_FOOTER
    }
}

export const showToolbarAndFooter = () => {
    return {
        type: actionTypes.SHOW_TOOLBAR_AND_FOOTER
    }
}

export const errorServor = (error) => {
    return {
        type: actionTypes.AUTH_ERROR,
        error: error
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};
 
export const authLogout = () => {
    localStorage.clear();
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const registerSuccess = (value) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        value: value
    };
};

export const photoUrl = (url) => {
    return {
        type: actionTypes.PHOTO,
        photo: url
    }
}

export const photo = (id) => {
    return dispatch => {
        dispatch(authStart());
        firebase.storage().ref(`images/${id}/image`).getDownloadURL()
        .then(function(url) {
            dispatch(photoUrl(url))
        })
        .catch(err => {})
    };
};

export const tchat = (value) => {
    return {
        type: actionTypes.TCHAT,
        value: value
    };
};

export const authRegister = (email, password, history) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDPBaoPmbCgQfEQNz9VgHt88mGg6Jv4ces', authData)
        .then(response => {
            dispatch(errorServor('Votre compte viens d\'etre creer, vous allez etre rediriger dans quelques instant'));
            dispatch(registerSuccess(true));
            const photo = { photo : false };
            axios.put(`https://movies-52928.firebaseio.com/${response.data.localId}/photo.json/`, photo)
            .then(res => {})
            .catch(err => {})
            dispatch(tchat(false))
            localStorage.setItem('animation', true);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('id', response.data.localId);
            localStorage.setItem('email',response.data.email);
            localStorage.setItem('noSocial', true);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            setTimeout( () => {
                history.push('/home')
            }, 3000);
        })
        .catch(err => {
            dispatch(errorServor('Cet email existe Deja!'));
        })
    };
};

export const authLogin = (email, password, history) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDPBaoPmbCgQfEQNz9VgHt88mGg6Jv4ces', authData)
        .then(response => {
            let id = response.data.localId;
            axios.get(`https://movies-52928.firebaseio.com/${id}/photo.json/`)
            .then(response => { 
                if(response.data.photo === true)
                    dispatch(photo(id));
            })
            .catch(err => {})
            axios.get(`https://movies-52928.firebaseio.com/${id}/social.json/`)
            .then(res => {
                dispatch(tchat(res.data.social))
            })
            .catch(err => {})
            axios.get(`https://movies-52928.firebaseio.com/${response.data.localId}/user.json/`)
            .then(res => {
                localStorage.setItem('name',res.data.name)
            })
            .catch(err => {})
            localStorage.setItem('animation', true);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('id', response.data.localId);
            localStorage.setItem('email',response.data.email);
            localStorage.setItem('noSocial', true);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            history.push('/home');
        })
        .catch(err => {
            if (err.response.data.error.message === 'INVALID_PASSWORD')
                dispatch(errorServor('Mot de passe Invalid'));
            else if (err.response.data.error.message === 'EMAIL_NOT_FOUND')
                dispatch(errorServor('Mail Invalid'));
        })
    };
};

export const socialAuth = (provider, history, name) => {
    return dispatch => {
        dispatch(authStart());
        firebase.auth().signInWithPopup(provider)
        .then(response => {
            localStorage.setItem('animation', true)
            localStorage.setItem('id', response.user.uid)
            localStorage.setItem('token', response.credential.accessToken)
            localStorage.setItem('name', response.user.displayName)
            if (name === 'twitter')
                localStorage.setItem('photo', response.additionalUserInfo.profile.profile_image_url)
            else if (name === 'gmail')
                localStorage.setItem('photo', response.user.photoURL)
            localStorage.setItem('email', response.user.email)
            dispatch(authSuccess(response.credential.idToken, response.user.uid));
            axios.get(`https://movies-52928.firebaseio.com/${response.user.uid}/social.json/`)
            .then(res => {
                dispatch(tchat(res.data.social))
            })
            .catch(err => {})
            history.push('/home');  
        })
        .catch(err => {
            console.log('errrr')
            dispatch(authFail(err.message));
        })  
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id')
        if (!token)
            dispatch(authLogout());
        else {
            dispatch(authSuccess(token,id));
            axios.get(`https://movies-52928.firebaseio.com/${id}/social.json/`)
            .then(res => {
                dispatch(tchat(res.data.social))
            })
            .catch(err => {})
            if (localStorage.getItem('photo')=== null && localStorage.getItem('photoPhone') === null) {
                axios.get(`https://movies-52928.firebaseio.com/${id}/photo.json/`)
                .then(response => { 
                    if(response.data.photo === true)
                        dispatch(photo(id));
                })
                .catch(err => {})  
            }
        }
    };
};