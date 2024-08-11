import axios from 'axios';

export const signup = async (userData) => {
    const response = await axios.post('/api/auth/signup', userData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data;
};