import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://face-book-backend.onrender.com/'
});

export default instance;
