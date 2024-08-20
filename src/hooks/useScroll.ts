import debounce from '@/utils/debounce';
import { useState, useEffect } from 'react';

export function useScroll() {
  const [scroll, setScroll] = useState<number>(0);

  const listener = () => {
    setScroll(window.pageYOffset);
  };

  const delay = 60;

  useEffect(() => {
    window.addEventListener('scroll', debounce(listener, delay));
    return () => window.removeEventListener('scroll', listener);
  });

  return {
    scroll,
  };
}
