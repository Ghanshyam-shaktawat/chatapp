import { create } from "zustand";
const userAuthStore = create((set, get) => ({
  userData: null,
  loading: false,
  user: () => ({
    user_id: get().userData?.user_id || null,
    username: get().userData?.username || null,
    email: get().userData?.email || null,
  }),
  setUser: (user) => set({ userData: user }),
  setLoading: (loading) => set({ loading }),
  isLoggedIn: () => get().userData !== null,
}));

export { userAuthStore };
