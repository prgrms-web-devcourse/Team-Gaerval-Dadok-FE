import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import Portal from '@/ui/Base/Portal';

import ToastItem from './ToastItem';
import useTimeout from './useTimeout';
import type { ToastController, ToastOption } from './types';

export const ToastContext = createContext({} as ToastController);

type ToastProviderProps = {
  duration?: number;
};

type SlideAnimation = 'slide-in' | 'slide-out' | 'slide-init';

const animations = {
  'slide-in': 'animate-slide-in',
  'slide-out': 'animate-slide-out',
  'slide-init': 'animate-slide-init',
} as const;

const ToastProvider = ({
  duration = 1000,
  children,
}: PropsWithChildren<ToastProviderProps>) => {
  const [toast, setToast] = useState<ToastOption | null>(null);
  const [animation, setAnimation] = useState<SlideAnimation>('slide-init');

  const timer = useTimeout();

  const controller = useMemo<ToastController>(
    () => ({
      show: ({ type, message }) => {
        setToast({ type, message });

        setAnimation('slide-init');
        setAnimation('slide-in');

        timer.set(() => {
          setAnimation('slide-out');
        }, duration);
      },
    }),
    [timer, duration]
  );

  return (
    <ToastContext.Provider value={controller}>
      {children}
      <Portal id="toast">
        <div
          className={`fixed bottom-[1.5rem] min-w-[40rem] translate-y-[300%] ${animations[animation]}`}
        >
          {toast && <ToastItem type={toast.type} message={toast.message} />}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
