import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from "./interceptors";

export const BACKEND = " https://jsonplaceholder.typicode.com";

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: BACKEND,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);
api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
