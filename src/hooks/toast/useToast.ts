import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { ToastAtom, toastsAtom } from './atoms';

const useToast = () => {
  const setToasts = useSetRecoilState(toastsAtom);

  const hideToast = useCallback(
    (toastId: ToastAtom['id']) => {
      setToasts(currentToasts =>
        currentToasts.filter(toast => toast.id !== toastId)
      );
    },
    [setToasts]
  );

  const showToast = useCallback(
    ({ message, duration = 2000 }: Pick<ToastAtom, 'message' | 'duration'>) => {
      const id = new Date().getTime();
      setToasts(currentToasts => [...currentToasts, { message, duration, id }]);
      setTimeout(() => hideToast(id), 500 + duration);
    },
    [hideToast, setToasts]
  );

  return { showToast };
};

export default useToast;
