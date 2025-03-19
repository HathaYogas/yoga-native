import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 액세스 토큰이 만료된 경우 (401 에러)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          '/api/refresh',
          {},
          {
            withCredentials: true,
          }
        );

        return axiosInstance(originalRequest);
      } catch (error) {
        // 리프레시 토큰도 만료된 경우
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
