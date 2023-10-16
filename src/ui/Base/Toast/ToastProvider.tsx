import { createContext, ReactNode, useMemo, useState } from 'react';

import Portal from '@/ui/Base/Portal';

import ToastItem from './ToastItem';
import useTimeout from './useTimeout';
import type { ToastController, ToastOption } from './types';

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

  const timer = useTimeout();

  const controller = useMemo<ToastController>(
    () => ({
      show: ({ type, message, duration = 1000 }) => {
        setToast({ type, message, duration });

        setAnimation('slide-init');
        setAnimation('slide-in');

        timer.set(() => {
          setAnimation('slide-out');
        }, duration);
      },
    }),
    [timer]
  );

  return (
    <ToastContext.Provider value={controller}>
      {children}
      <Portal id="toast">
        <div
          className={`fixed bottom-[1.5rem] left-[1.5rem] right-[1.5rem] w-[43rem] max-w-[calc(100%-3rem)] translate-y-[300%] ${animations[animation]}`}
        >
          {toast && <ToastItem type={toast.type} message={toast.message} />}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
