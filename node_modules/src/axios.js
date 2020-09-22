import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://movies-52928.firebaseio.com/'
});

export default instance;