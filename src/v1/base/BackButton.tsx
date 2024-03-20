'use client';

import { IconArrowLeft } from '@public/icons';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <IconArrowLeft />
    </button>
  );
};

export default BackButton;
