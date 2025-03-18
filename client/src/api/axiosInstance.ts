import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 409) {
        return Promise.reject(new Error(error.response.data.message || 'Часть параметров уже используется'));
      }
      return Promise.reject(new Error(error.response.data.message || 'Произошла ошибка на сервере'));
    }
    return Promise.reject(new Error('Ошибка сети. Проверьте соединение.'));
  }
);

export default axiosInstance;
