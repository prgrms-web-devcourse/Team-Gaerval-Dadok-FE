import { atom } from 'recoil';

export interface ToastAtom {
  id: number;
  message: string;
  duration?: number;
}

export const toastsAtom = atom<ToastAtom[]>({
  key: 'toasts',
  default: [],
});
