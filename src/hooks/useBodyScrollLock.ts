/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';

type Options = {
  enabled?: boolean;
};

export function useBodyScrollLock(options?: Options) {
  const enabled = options?.enabled;
  const scrollRef = useRef(0);

  const lockScroll = useCallback(() => {
    scrollRef.current = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.marginTop = `-${scrollRef.current}px`;
  }, []);

  const openScroll = useCallback(() => {
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('margin-top');
    window.scrollTo(0, scrollRef.current);
  }, []);

  const shouldLock = (event: TouchEvent) => {
    if (!event.target) return;

    const node = event.target as HTMLElement;
    const hasScrollBar = node.clientHeight < node.scrollHeight;

    if (
      (node as any).type !== 'textarea' ||
      ((node as any).type === 'textarea' && !hasScrollBar)
    ) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.addEventListener('touchmove', shouldLock, { passive: false });

    return () => {
      document.removeEventListener('touchmove', shouldLock, {
        passive: false,
      } as any);
    };
  }, [enabled]);

  // useEffect(() => {
  //   if (enabled === undefined) {
  //     return;
  //   }

  //   if (enabled) {
  //     lockScroll();
  //   } else {
  //     openScroll();
  //   }
  // }, [enabled, lockScroll, openScroll]);

  return { lockScroll, openScroll };
}
