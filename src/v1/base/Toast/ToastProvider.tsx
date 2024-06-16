import { createContext, ReactNode, useMemo, useState } from 'react';

import type { ToastController, ToastOption } from '@/v1/base/Toast/types';

import ToastItem from '@/v1/base/Toast/ToastItem';
import Portal from '@/v1/base/Portal';

export const ToastContext = createContext({} as ToastController);

type SlideAnimation = 'slide-in' | 'slide-out' | 'slide-init';

const animations = {
  'slide-in': 'animate-slide-in',
  'slide-out': 'animate-slide-out',
  'slide-init': 'animate-slide-init',
} as const;

const ToastProvider = ({ children }: { children?: ReactNode }) => {
  const [toast, setToast] = useState<ToastOption | null>(null);
  const [animation, setAnimation] = useState<SlideAnimation>('slide-init');

  const controller = useMemo<ToastController>(
    () => ({
      show: ({ type, message, duration = 2000 }) => {
        setToast({ type, message, duration });

        setAnimation('slide-init');
        setAnimation('slide-in');

        setTimeout(() => {
          setAnimation('slide-out');
        }, duration);
      },
    }),
    []
  );

  return (
    <ToastContext.Provider value={controller}>
      {children}
      <Portal id="toast">
        <div
          className={`fixed bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] w-full max-w-[43rem] translate-y-[300%] ${animations[animation]} z-20 m-auto px-[1.5rem]`}
        >
          {toast && <ToastItem type={toast.type} message={toast.message} />}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
