import { useCallback, useEffect, useRef } from 'react';
import { nonPassive } from '@/utils/eventListener';

type Options = {
  enabled: boolean;
};

const getTouchXY = (event: TouchEvent | WheelEvent) =>
  'changedTouches' in event
    ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
    : [0, 0];

const useRemoveVerticalScroll = (options?: Options) => {
  const enabled = options ? options.enabled : true;

  const touchStartRef = useRef([0, 0]);

  const scrollTouchStart = useCallback((event: TouchEvent) => {
    touchStartRef.current = getTouchXY(event);
  }, []);

  const shouldLock = useCallback((event: TouchEvent | WheelEvent) => {
    if (!event.target) return;

    const node = event.target as HTMLElement;
    const { clientHeight, scrollHeight, scrollTop } = node;

    const touch = getTouchXY(event);
    const touchStart = touchStartRef.current;
    const deltaY = 'deltaY' in event ? event.deltaY : touchStart[1] - touch[1];

    const isDeltaYPositive = deltaY > 0; // scroll down

    const isScrollToTopEnd = !isDeltaYPositive && scrollTop === 0;
    const isScrollToBottomEnd =
      isDeltaYPositive && scrollTop + clientHeight === scrollHeight;

    if (
      node.tagName !== 'TEXTAREA' ||
      isScrollToTopEnd ||
      isScrollToBottomEnd
    ) {
      if (event.cancelable) {
        event.preventDefault();
      }
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.addEventListener('wheel', shouldLock, nonPassive);
    document.addEventListener('touchmove', shouldLock, nonPassive);
    document.addEventListener('touchstart', scrollTouchStart, nonPassive);

    return () => {
      document.removeEventListener('wheel', shouldLock, nonPassive);
      document.removeEventListener('touchmove', shouldLock, nonPassive);
      document.removeEventListener('touchstart', scrollTouchStart, nonPassive);
    };
  }, [enabled, shouldLock, scrollTouchStart]);
};

export default useRemoveVerticalScroll;
