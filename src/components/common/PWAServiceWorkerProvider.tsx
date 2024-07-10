'use client';

import { useEffect } from 'react';

const PWAServiceWorkerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const registerWorker = async () => {
        const registration = await navigator.serviceWorker.register(
          '/pwaServiceWorker.js'
        );
        registration.waiting?.postMessage('SKIP_WAITING');
      };

      try {
        registerWorker();
      } catch (error) {
        console.error('register failed: ', error);
      }
    }
  }, []);

  return <>{children}</>;
};

export default PWAServiceWorkerProvider;
