import axios from "axios";
import { authStore } from "~/store/authStore";

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = authStore((state) => state.token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
