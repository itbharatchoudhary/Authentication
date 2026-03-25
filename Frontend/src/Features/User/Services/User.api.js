import api from '../../../Services/Axios';

export const getMe        = ()  => api.get('/users/me');
export const getAllUsers   = ()  => api.get('/users');
export const deleteUser   = (id)=> api.delete(`/users/${id}`);