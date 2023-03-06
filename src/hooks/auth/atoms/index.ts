import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import tokenStorage from '@/utils/storage';
import { ACCESS_TOKEN_STORAGE_KEY } from '@/constants/index';

const accessTokenAtom = atom<string | null>({
  key: 'accessToken',
  default: null,
  effects: [
    ({ setSelf }) => {
      const storage =
        typeof window !== 'undefined'
          ? tokenStorage(ACCESS_TOKEN_STORAGE_KEY)
          : undefined;

      if (!storage) {
        return;
      }

      const defaultToken = storage.get();
      const isAuthorized = () => !!defaultToken;

      if (isAuthorized()) {
        setSelf(defaultToken);
      }
    },
  ],
});

const useAccessToken = () => useRecoilState(accessTokenAtom);
const useResetAccessToken = () => useResetRecoilState(accessTokenAtom);

export { useAccessToken, useResetAccessToken };
