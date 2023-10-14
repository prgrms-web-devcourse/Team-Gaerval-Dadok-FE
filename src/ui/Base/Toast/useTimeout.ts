import { useRef } from 'react';

const useTimeout = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return {
    set(callback: () => void, duration: number) {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(callback, duration);
    },
  };
};

export default useTimeout;
