import { useState } from 'react';
import * as userApi from '../services/user.api.js';
import { useAuthStore } from '../../../app/store.js';

export const useUser = () => {
  const { user, patchUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const { data } = await userApi.getMe();
      patchUser(data.user);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    } finally { setLoading(false); }
  };

  return { user, loading, error, refresh };
};