import { create } from "zustand";
import { TOKEN_KEYS } from "../Utils/Constants";

const hydrate = () => {
  try {
    const user = JSON.parse(localStorage.getItem(TOKEN_KEYS.USER) || "null");
    const token = localStorage.getItem(TOKEN_KEYS.ACCESS);
    return { user, token, isAuth: !!(user && token) };
  } catch {
    return { user: null, token: null, isAuth: false };
  }
};

/* ── Auth store ─────────────────────────────────────────────────────────── */
export const useAuthStore = create((set) => ({
  ...hydrate(),
  loading: false,
  error: null,

  setAuth: ({ user, accessToken, refreshToken }) => {
    localStorage.setItem(TOKEN_KEYS.ACCESS, accessToken);
    localStorage.setItem(TOKEN_KEYS.REFRESH, refreshToken);
    localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(user));
    set({ user, token: accessToken, isAuth: true, error: null });
  },

  patchUser: (patch) =>
    set((s) => {
      const u = { ...s.user, ...patch };
      localStorage.setItem(TOKEN_KEYS.USER, JSON.stringify(u));
      return { user: u };
    }),

  logout: () => {
    Object.values(TOKEN_KEYS).forEach((k) => localStorage.removeItem(k));
    set({ user: null, token: null, isAuth: false });
  },

  setLoading: (v) => set({ loading: v }),
  setError: (v) => set({ error: v }),
  clearError: () => set({ error: null }),
}));

/* ── OTP flow store ─────────────────────────────────────────────────────── */
export const useOtpStore = create((set) => ({
  email: "",
  purpose: "registration", // 'registration' | 'password-reset'
  otp: "", // verified OTP (for reset-password handoff)
  set: (patch) => set(patch),
  clear: () => set({ email: "", purpose: "registration", otp: "" }),
}));
