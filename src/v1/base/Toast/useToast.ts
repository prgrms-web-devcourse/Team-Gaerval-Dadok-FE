import { useContext } from 'react';

import type { ToastOption } from '@/v1/base/Toast/types';

import { ToastContext } from '@/v1/base/Toast/ToastProvider';

const useToast = () => {
  const toastController = useContext(ToastContext);

  return {
    show: (option: ToastOption) => {
      toastController.show(option);
    },
  };
};

export default useToast;
