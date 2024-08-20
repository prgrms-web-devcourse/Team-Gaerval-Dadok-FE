import { ACCESS_TOKEN_STORAGE_KEY } from '@/constants/index';
import webStorage from '@/utils/storage';

const storage = webStorage(ACCESS_TOKEN_STORAGE_KEY);

const isAuthed = () => {
  const accessToken = storage.get();
  return !!accessToken;
};

const setAuth = (newToken: string) => {
  storage.set(newToken);
};

const removeAuth = () => {
  storage.remove();
};

export { isAuthed, setAuth, removeAuth };
