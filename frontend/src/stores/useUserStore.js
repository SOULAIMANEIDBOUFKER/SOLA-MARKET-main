import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useUserStore = create((set) => ({
  user: null,
  checkingAuth: true,
  loading: false,

  // ✅ runs on app start
  checkAuth: async () => {
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data.user || res.data, checkingAuth: false });
    } catch (error) {
      
      set({ user: null, checkingAuth: false });
    }
  },

  signup: async (payload) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/signup", payload);
      set({ user: res.data.user || res.data, loading: false });
      toast.success("Account created");
      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Signup failed");
      throw error;
    }
  },

  login: async (payload) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", payload);
      set({ user: res.data.user || res.data, loading: false });
      toast.success("Welcome back");
      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.post("/auth/logout");
      set({ user: null, loading: false });
      toast.success("Logged out");
    } catch (error) {
      set({ loading: false });
      toast.error("Logout failed");
      throw error;
    }
  },
}));
