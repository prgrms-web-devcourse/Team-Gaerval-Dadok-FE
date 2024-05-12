import { useEffect } from 'react';
import { nonPassive } from '@/utils/eventListener';

type Options = {
  enabled?: boolean;
};

const useRemoveScroll = (options?: Options) => {
  const enabled = options?.enabled;

  const shouldLock = (event: TouchEvent | WheelEvent) => {
    if (!event.target) return;

    const node = event.target as HTMLElement;
    const hasScrollBar = node.clientHeight < node.scrollHeight;

    if (
      node.tagName !== 'TEXTAREA' ||
      (node.tagName === 'TEXTAREA' && !hasScrollBar)
    ) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.addEventListener('wheel', shouldLock, nonPassive);
    document.addEventListener('touchmove', shouldLock, nonPassive);

    return () => {
      document.removeEventListener('wheel', shouldLock, nonPassive);
      document.removeEventListener('touchmove', shouldLock, nonPassive);
    };
  }, [enabled]);
};

export default useRemoveScroll;
