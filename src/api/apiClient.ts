/* eslint-disable no-console */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { decryptToken } from "../utils/token-helper";
import config from "./config";

const getToken = (): string | undefined => {
  return decryptToken();
};

interface ApiClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  post<T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
  put<T, D>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
  delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>>;
}

const ApiClient = (auth: boolean = true): ApiClient => {
  const { BASE_URL } = config;

  const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (auth) {
        const token = getToken();
        console.log('🔑 API Request - Token exists:', !!token);
        console.log('🔑 API Request - URL:', config.url);
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
          console.log('✅ Authorization header set');
        } else {
          console.warn('⚠️ No token available for authenticated request');
        }
      }
      return config;
    },
    (error) => {
      console.error('❌ Request interceptor error:', error);
      return Promise.reject(error);
    },
  );

  const get = async <T>(
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<AxiosResponse<T>> => {
    return await axiosInstance.get<T>(url, config);
  };

  const post = async <T, D>(
    url: string,
    data: D,
    config: AxiosRequestConfig = {},
  ): Promise<AxiosResponse<T>> => {
    const headers = {
      "Content-Type":
        data instanceof FormData ? "multipart/form-data" : "application/json",
      ...config.headers,
    };
    return await axiosInstance.post<T>(url, data, { ...config, headers });
  };

  const put = async <T, D>(
    url: string,
    data: D,
    config: AxiosRequestConfig = {},
  ): Promise<AxiosResponse<T>> => {
    const headers = {
      "Content-Type":
        data instanceof FormData ? "multipart/form-data" : "application/json",
      ...config.headers,
    };
    return await axiosInstance.put<T>(url, data, { ...config, headers });
  };

  const deleteRequest = async <T>(
    url: string,
    config: AxiosRequestConfig = {},
  ): Promise<AxiosResponse<T>> => {
    return await axiosInstance.delete<T>(url, config);
  };

  return {
    get,
    post,
    put,
    delete: deleteRequest,
  };
};

export default ApiClient;
