import { ReactNode, useEffect, useState } from 'react';

import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';

const AuthRequired = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { isAuthed } = useAuth();

  useEffect(() => {
    if (!isAuthed) {
      router.push('/');
    }
    setMounted(true);
  }, [isAuthed, router]);

  if (!isAuthed) return null;

  return <>{mounted && children}</>;
};

export default AuthRequired;
