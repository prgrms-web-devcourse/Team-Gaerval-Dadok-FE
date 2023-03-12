import { ReactNode, useEffect, useState } from 'react';

import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';

const AuthRequired = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isAuthed } = useAuth();

  useEffect(() => {
    setMounted(true);

    if (!isAuthed) {
      router.replace('/login');
    }
  }, [isAuthed, router]);

  return <>{mounted && isAuthed && children}</>;
};

export default AuthRequired;
