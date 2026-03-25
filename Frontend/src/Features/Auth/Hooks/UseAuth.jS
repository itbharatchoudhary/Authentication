import { useNavigate } from "react-router-dom";
import { useAuthStore, useOtpStore } from "../../../App/Store.js";
import * as authApi from "../Services/Auth.api.js";
import { ROUTES, TOKEN_KEYS } from "../../../Utils/Constants.js";

const err = (e) =>
  e?.response?.data?.message || e?.message || "Something went wrong";

export const useAuth = () => {
  const navigate = useNavigate();
  const auth = useAuthStore();
  const otpStore = useOtpStore();

  const wrap = async (fn) => {
    auth.setLoading(true);
    auth.clearError();
    try {
      await fn();
    } catch (e) {
      auth.setError(err(e));
    } finally {
      auth.setLoading(false);
    }
  };

  return {
    user: auth.user,
    isAuth: auth.isAuth,
    loading: auth.loading,
    error: auth.error,
    clearError: auth.clearError,

    register: (data) =>
      wrap(async () => {
        await authApi.register(data);
        otpStore.set({ email: data.email, purpose: "registration" });
        navigate(ROUTES.VERIFY_OTP);
      }),

    verifyOtp: (otp) =>
      wrap(async () => {
        const { data } = await authApi.verifyEmail({
          email: otpStore.email,
          otp,
        });
        auth.setAuth({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
        otpStore.clear();
        navigate(ROUTES.HOME);
      }),

    login: (data) =>
      wrap(async () => {
        const { data: d } = await authApi.login(data);
        auth.setAuth({
          user: d.user,
          accessToken: d.accessToken,
          refreshToken: d.refreshToken,
        });
        navigate(ROUTES.HOME);
      }),

    googleLogin: (idToken) =>
      wrap(async () => {
        const { data } = await authApi.googleAuth({ idToken });
        auth.setAuth({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
        navigate(ROUTES.HOME);
      }),

    forgotPassword: (email) =>
      wrap(async () => {
        await authApi.forgotPassword({ email });
        otpStore.set({ email, purpose: "password-reset" });
        navigate(ROUTES.VERIFY_OTP);
      }),

    verifyResetOtp: (otp) =>
      wrap(async () => {
        // Just store otp and navigate to reset page (no API call here — reset page handles it)
        otpStore.set({ otp });
        navigate(ROUTES.RESET_PASSWORD);
      }),

    resetPassword: (newPassword) =>
      wrap(async () => {
        await authApi.resetPassword({
          email: otpStore.email,
          otp: otpStore.otp,
          newPassword,
        });
        otpStore.clear();
        navigate(ROUTES.LOGIN);
      }),

    logout: async () => {
      try {
        await authApi.logoutApi({
          refreshToken: localStorage.getItem(TOKEN_KEYS.REFRESH),
        });
      } catch {}
      auth.logout();
      navigate(ROUTES.LANDING);
    },

    resendOtp: (email, purpose) => authApi.resendOtp({ email, purpose }),

    pendingEmail: otpStore.email,
    otpPurpose: otpStore.purpose,
  };
};
