import { useEffect } from 'react';

export function useBodyScrollLock({ enabled = true }: { enabled?: boolean }) {
  useEffect(() => {
    if (enabled) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [enabled]);
}
