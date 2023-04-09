import { atom, useRecoilState, useResetRecoilState } from 'recoil';

import { ACCESS_TOKEN_STORAGE_KEY } from '@/constants/index';
import tokenStorage from '@/utils/storage';

const accessTokenAtom = atom<string | null>({
  key: 'accessToken',
  default: null,
  effects: [
    ({ setSelf }) => {
      const storage = tokenStorage(ACCESS_TOKEN_STORAGE_KEY);
      const storedToken = storage.get();

      storedToken && setSelf(storedToken);
    },
  ],
});

const useAccessToken = () => useRecoilState(accessTokenAtom);
const useResetAccessToken = () => useResetRecoilState(accessTokenAtom);

export { useAccessToken, useResetAccessToken };
