import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
  // 🔹 separated states
  featuredProducts: [],
  newProducts: [], // ✅ NEW
  categoryProducts: [],
  adminProducts: [],
  loading: false,

  // ===================== CREATE =====================
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((state) => ({
        adminProducts: [...state.adminProducts, res.data],
        loading: false,
      }));
      toast.success("Product created");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create product");
      set({ loading: false });
    }
  },

  // ===================== FETCH =====================
  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products/featured");
      set({ featuredProducts: res.data, loading: false });
    } catch (error) {
      console.log("Error fetching featured products", error);
      set({ loading: false });
    }
  },

  // ✅ NEW ARRIVALS
  fetchNewProducts: async (limit = 10) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/new?limit=${limit}`);
      set({ newProducts: res.data, loading: false });
    } catch (error) {
      console.log("Error fetching new products", error);
      set({ loading: false });
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({ categoryProducts: res.data.products, loading: false });
    } catch (error) {
      toast.error("Failed to fetch category products");
      set({ loading: false });
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      set({ adminProducts: res.data.products, loading: false });
    } catch (error) {
      toast.error("Failed to fetch products");
      set({ loading: false });
    }
  },

  // ===================== ACTIONS =====================
  deleteProduct: async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      set((state) => ({
        adminProducts: state.adminProducts.filter((p) => p._id !== id),
      }));
      toast.success("Product deleted");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  },

  toggleFeaturedProduct: async (id) => {
    try {
      const res = await axios.patch(`/products/${id}`);
      set((state) => ({
        adminProducts: state.adminProducts.map((p) =>
          p._id === id ? { ...p, isFeatured: res.data.isFeatured } : p
        ),
      }));
    } catch (error) {
      toast.error("Failed to update product");
    }
  },
}));
