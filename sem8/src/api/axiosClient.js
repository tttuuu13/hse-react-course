import axios from 'axios';

const axiosClient = axios.create();

axiosClient.interceptors.request.use(
  (config) => {
    config.baseURL = 'https://jsonplaceholder.typicode.com/';
    
    config.headers.Authorization = 'Bearer demo-token';
    
    console.log('Interceptor:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;