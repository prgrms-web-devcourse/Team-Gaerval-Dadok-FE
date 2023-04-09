import { useEffect, useState } from 'react';
import { useAccessToken, useResetAccessToken } from './atoms';

import { ACCESS_TOKEN_STORAGE_KEY } from '@/constants/index';
import tokenStorage from '@/utils/storage';

const useAuth = () => {
  const storage = tokenStorage(ACCESS_TOKEN_STORAGE_KEY);
  const [accessToken, setAccessToken] = useAccessToken();
  const [isAuthed, setIsAuthed] = useState(!!accessToken);
  const resetAccessToken = useResetAccessToken();

  const setAuth = (newToken: string) => {
    storage.set(newToken);
    setAccessToken(newToken);
  };

  const removeAuth = () => {
    storage.remove();
    resetAccessToken();
  };

  useEffect(() => {
    setIsAuthed(!!accessToken);
  }, [accessToken]);

  return {
    accessToken,
    isAuthed,
    setAuth,
    removeAuth,
  };
};

export default useAuth;
