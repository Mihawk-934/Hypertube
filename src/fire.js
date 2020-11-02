import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyDPBaoPmbCgQfEQNz9VgHt88mGg6Jv4ces",
  authDomain: "movies-52928.firebaseapp.com",
  databaseURL: "https://movies-52928.firebaseio.com",
  projectId: "movies-52928",
  storageBucket: "movies-52928.appspot.com",
  messagingSenderId: "517177247962",
  appId: "1:517177247962:web:559e1d206b50b680bdfde3",
  measurementId: "G-XDQM9NZY3B"
};

firebase.initializeApp(firebaseConfig);
export const providerG = new firebase.auth.GoogleAuthProvider();
export const providerT = new firebase.auth.TwitterAuthProvider();
const storage = firebase.storage();
export { storage, firebase as default };