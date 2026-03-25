import api from '../../../services/axios.js';

export const getMe        = ()  => api.get('/users/me');
export const getAllUsers   = ()  => api.get('/users');
export const deleteUser   = (id)=> api.delete(`/users/${id}`);