import api from '../../../services/axios.js';

export const register       = (d) => api.post('/auth/register',        d);
export const verifyEmail    = (d) => api.post('/auth/verify-email',     d);
export const login          = (d) => api.post('/auth/login',            d);
export const googleAuth     = (d) => api.post('/auth/google',           d);
export const forgotPassword = (d) => api.post('/auth/forgot-password',  d);
export const resetPassword  = (d) => api.post('/auth/reset-password',   d);
export const resendOtp      = (d) => api.post('/otp/resend',            d);
export const logoutApi      = (d) => api.post('/auth/logout',           d);