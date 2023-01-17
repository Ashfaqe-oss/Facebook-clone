import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://facebook-backend-uo3.herokuapp.com'
});

export default instance;
