import { useEffect, useRef } from 'react';
import { nonPassive } from '@/utils/eventListener';

type Options = {
  enabled?: boolean;
};

const getTouchXY = (event: TouchEvent | WheelEvent) =>
  'changedTouches' in event
    ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
    : [0, 0];

const useRemoveVerticalScroll = (options?: Options) => {
  const enabled = options?.enabled;

  const touchStartRef = useRef([0, 0]);

  const shouldHeightLock = (event: TouchEvent | WheelEvent) => {
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
      isScrollToTopEnd && console.log('top end');
      isScrollToBottomEnd && console.log('bottom end');
      event.preventDefault();
    }
  };

  const scrollTouchStart = (event: TouchEvent) => {
    touchStartRef.current = getTouchXY(event);
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.addEventListener('wheel', shouldHeightLock, nonPassive);
    document.addEventListener('touchmove', shouldHeightLock, nonPassive);
    document.addEventListener('touchstart', scrollTouchStart, nonPassive);

    return () => {
      document.removeEventListener('wheel', shouldHeightLock, nonPassive);
      document.removeEventListener('touchmove', shouldHeightLock, nonPassive);
      document.removeEventListener('touchstart', scrollTouchStart, nonPassive);
    };
  }, [enabled]);
};

export default useRemoveVerticalScroll;
