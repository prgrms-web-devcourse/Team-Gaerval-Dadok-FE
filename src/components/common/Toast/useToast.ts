import { useContext } from 'react';

import type { ToastOption } from '@/components/common/Toast/types';

import { ToastContext } from '@/components/common/Toast/ToastProvider';

const useToast = () => {
  const toastController = useContext(ToastContext);

  return {
    show: (option: ToastOption) => {
      toastController.show(option);
    },
  };
};

export default useToast;
