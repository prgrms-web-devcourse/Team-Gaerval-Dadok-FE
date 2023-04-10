import { ACCESS_TOKEN_STORAGE_KEY } from '@/constants/index';
import webStorage from '@/utils/storage';

const useAuth = () => {
  const storage = webStorage(ACCESS_TOKEN_STORAGE_KEY);
  const accessToken = storage.get();

  const setAuth = (newToken: string) => {
    storage.set(newToken);
  };

  const removeAuth = () => {
    storage.remove();
  };

  return {
    isAuthed: !!accessToken,
    setAuth,
    removeAuth,
  };
};

export default useAuth;
