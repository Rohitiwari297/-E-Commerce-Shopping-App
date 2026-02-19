import axios from "axios";
export const BaseURI = "`https://ecommerce.suryapolypack.com/";

const axiosInstance = axios.create({
  baseURL: "https://ecommerce.suryapolypack.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor → token add
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
