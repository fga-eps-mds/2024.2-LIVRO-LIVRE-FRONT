import axios from "axios";
import { useMemo } from "react"
import { API_BASE_URL, API_BOOKS_URL, API_RENTALS_URL } from "../../config/environment";
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
    ...err?.response,
    ...err?.response?.data,
  };
};

const useApi = () => {
  const api = useMemo(
    () => ({
      base: createApiInstance(API_BASE_URL),
      books: createApiInstance(API_BOOKS_URL),
      rentals: createApiInstance(API_RENTALS_URL),
    }),
    [],
  );

  return {
    getProfile: (token: string | null): Promise<{ data: User }> => {
      return new Promise((resolve) => {
        api.base
          .get('/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          })
          .then((res) => resolve(res))
          .catch((err) => resolve(getDefaultErrorUseAPIMessage(err)));
      });
    },
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
        api.base
          .post('/auth/signup', data)
          .then((res) => resolve(res))
          .catch((err) => resolve(getDefaultErrorUseAPIMessage(err)));
      });
    },
    signIn: (data: {
      email: string;
      password: string
    }): Promise<{ data: {
      accessToken: string;
      refreshToken: string;
    } }> => {
      return new Promise((resolve) => {
        api.base
          .post('/auth/signin', {
            ...data,
            role: 'user',
          })
          .then((res) => resolve(res))
          .catch((err) => resolve(getDefaultErrorUseAPIMessage(err)));
      });
    },
    recoverPassword: (email: string): Promise<{ data: any }> => {
      return new Promise((resolve) => {
        api.base
          .post(`/auth/recover-password`, { email })
          .then((res) => resolve(res))
          .catch((err) => resolve(getDefaultErrorUseAPIMessage(err)));
      });
    },
    changePassword: (password: string, token: string): Promise<{ data: any }> => {
      return new Promise((resolve) => {
        api.base
          .post(`/auth/change-password`, { password }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => resolve(res))
          .catch((err) => resolve(getDefaultErrorUseAPIMessage(err)));
      });
    },
    editProfile: async (data: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      oldPassword?: string
      newPassword?: string
    }, token: string | null): Promise<{ data: {
      id: string;
    } }> => {
      return new Promise((resolve) => {
        api.base
          .put('/users', data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => resolve(res))
          .catch((err) => resolve(getDefaultErrorUseAPIMessage(err)));
      });
    },
    deleteProfile: async (token: string | null): Promise<{ data: {
      id: string;
    } }> => {
      return new Promise((resolve) => {
        api.base
          .delete('/users', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => resolve(res))
          .catch((err) => resolve(getDefaultErrorUseAPIMessage(err)));
      });
    }
  }
}

export default useApi
