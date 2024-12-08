import axios from "axios";
import { useMemo } from "react"
import { API_BASE_URL } from "../../config/environment";
import { User } from "../../interfaces/user";

const createApiInstance = (url: string) => {
  const instance = axios.create({
    baseURL: url || '/',
  });
  instance.interceptors.request.use((config) => config, (error) => Promise.reject(error));
  instance.interceptors.response.use((response) => response, (error) => Promise.reject(error));
  return instance;
};

const getDefaultErrorUseAPIMessage = (err: any) => {
  return {
    error: true,
    ...err?.toJSON?.call(),
    ...err?.response,
    ...err?.response?.data,
    ...err?.data,
  };
};

const useApi = () => {
  const api = useMemo(
    () =>
      createApiInstance(API_BASE_URL),
    [],
  );

  return {
    signUp: (data: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      password: string
    }): Promise<{ data: {
      accessToken: string;
      refreshToken: string;
    } }> => {
      return new Promise((resolve) => {
        api
          .post('/auth/signup', data)
          .then((res) => resolve(res))
          .catch((err) => resolve(getDefaultErrorUseAPIMessage(err)));
      });
    }
  }
}

export default useApi
