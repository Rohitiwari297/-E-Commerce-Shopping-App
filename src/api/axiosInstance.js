import axios from "axios";
export const BaseURI = "`https://multigrocery.quickreachindia.com/";

const axiosInstance = axios.create({
  baseURL: "https://multigrocery.quickreachindia.com/",
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
