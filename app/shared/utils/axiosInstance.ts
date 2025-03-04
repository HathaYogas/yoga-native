import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // 기본 API URL을 설정합니다.
  timeout: 10000, // 요청 타임아웃 설정 (10초)
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 전송을 위해 필요
});

// 요청 인터셉터 추가 (필요한 경우)
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// 응답 인터셉터 추가 (필요한 경우)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 액세스 토큰이 만료된 경우 (401 에러)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 리프레시 토큰은 쿠키에 있으므로 별도의 헤더 설정 불필요
        const response = await axios.post(
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
