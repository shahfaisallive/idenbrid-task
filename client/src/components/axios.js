import axios from 'axios';

const baseURL = 'http://localhost:3001/api/color';

const instance = axios.create({
    baseURL: baseURL
});

export default instance;