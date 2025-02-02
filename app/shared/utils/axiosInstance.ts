import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '', // 기본 API URL을 설정합니다.
  timeout: 10000, // 요청 타임아웃 설정 (10초)
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가 (필요한 경우)
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가 (필요한 경우)
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공할 수 있습니다.
    return response;
  },
  (error) => {
    // 응답 오류 처리
    return Promise.reject(error);
  }
);

export default axiosInstance;
