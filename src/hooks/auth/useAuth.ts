import { useEffect, useState } from 'react';
import { useAccessToken, useResetAccessToken } from './atoms';

import tokenStorage from '@/utils/storage';
import { ACCESS_TOKEN_STORAGE_KEY } from '@/constants';

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
    isAuthed,
    setAuth,
    removeAuth,
  };
};

export default useAuth;
