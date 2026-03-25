import api from './axios.js';
import { TOKEN_KEYS } from '../Utils/Constants.js';

let refreshing = false;
let queue = [];
const drain = (err, token) => {
  queue.forEach(({ resolve, reject }) => err ? reject(err) : resolve(token));
  queue = [];
};

export const setupInterceptors = () => {
  // ── Request: attach access token ───────────────────────
  api.interceptors.request.use((cfg) => {
    const token = localStorage.getItem(TOKEN_KEYS.ACCESS);
    if (token) cfg.headers.Authorization = `Bearer ${token}`;
    return cfg;
  });

  // ── Response: refresh on 401 ───────────────────────────
  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const orig = error.config;
      if (error.response?.status !== 401 || orig._retry) {
        return Promise.reject(error);
      }

      if (refreshing) {
        return new Promise((resolve, reject) => queue.push({ resolve, reject }))
          .then((token) => { orig.headers.Authorization = `Bearer ${token}`; return api(orig); });
      }

      orig._retry = true;
      refreshing = true;

      try {
        const rt = localStorage.getItem(TOKEN_KEYS.REFRESH);
        if (!rt) throw new Error('No refresh token');

        const { data } = await api.post('/auth/refresh-token', { refreshToken: rt });
        localStorage.setItem(TOKEN_KEYS.ACCESS,  data.accessToken);
        localStorage.setItem(TOKEN_KEYS.REFRESH, data.refreshToken);
        drain(null, data.accessToken);
        orig.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(orig);
      } catch (err) {
        drain(err);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        refreshing = false;
      }
    }
  );
};

export default api;