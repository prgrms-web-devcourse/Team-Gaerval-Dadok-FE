import { useContext } from 'react';

import { ToastContext } from './ToastProvider';
import type { ToastOption } from './types';

const useToast = () => {
  const toastController = useContext(ToastContext);

  return {
    show: (option: ToastOption) => {
      toastController.show(option);
    },
  };
};

export default useToast;
