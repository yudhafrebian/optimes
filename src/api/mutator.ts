import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Instance untuk Service A (Lama)
export const AXIOS_INSTANCE_1 = axios.create({
  baseURL: 'http://192.168.68.99:2000',
  withCredentials: true,
});

// Instance untuk Service B (Baru)
// export const AXIOS_INSTANCE_BARU = axios.create({
//   baseURL: 'https://api-service-baru.com',
//   withCredentials: true,
// });

// Mutator untuk Service Lama
export const customInstance1 = <T>(config: AxiosRequestConfig): Promise<T> => {
  return AXIOS_INSTANCE_1(config).then((response: AxiosResponse<T>) => response.data);
};

// Mutator untuk Service Baru
// export const customInstance2 = <T>(config: AxiosRequestConfig): Promise<T> => {
//   return AXIOS_INSTANCE_BARU(config).then((response: AxiosResponse<T>) => response.data);
// };