import axios from "axios";

const isDev = import.meta.env.MODE === "development";

const baseURL = isDev
  ? "/api"
  : (import.meta.env.VITE_API_URL || "/api");

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;
