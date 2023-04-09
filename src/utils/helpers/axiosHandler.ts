import axios, { InternalAxiosRequestConfig } from 'axios';

import { ACCESS_TOKEN_STORAGE_KEY } from '@/constants';
import tokenStorage from '@/utils/storage';

const updateToken = async () => {
  const storage = tokenStorage(ACCESS_TOKEN_STORAGE_KEY);

  try {
    const {
      data: { accessToken },
    } = await axios.post<{ accessToken: string }>('/service-api/auth/token');

    if (!accessToken) {
      throw new Error('새로운 accessToken을 받아오지 못했어요.');
    }

    return accessToken;
  } catch (error) {
    storage.remove();
    return Promise.reject(error);
  }
};

const setAxiosAuthHeader = (
  config: InternalAxiosRequestConfig,
  token: string
) => {
  config.headers['Authorization'] = `Bearers ${token}`;
};

export { updateToken, setAxiosAuthHeader };
