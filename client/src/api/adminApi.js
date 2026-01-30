

import axios from "axios";

const adminApi = axios.create({
  baseURL: `${import.meta.env.VITE_AXIOS_MAIN_BASE_URL}/admin`,
  withCredentials: true,
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default adminApi;
