import axios from "axios";

const userApi = axios.create({
  baseURL: `${import.meta.env.VITE_AXIOS_MAIN_BASE_URL}/user`,
  withCredentials: true,
});

userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default userApi;
