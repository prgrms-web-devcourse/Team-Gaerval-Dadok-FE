'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import Image from '@/components/common/Image';

export const ErrorPage = () => {
  const router = useRouter();

  return (
    <html>
      <body>
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-[2rem]">
          <Image
            src="/images/loading.gif"
            width={230}
            height={160}
            alt="loading"
          />
          <div className="font-heading-bold">
            <span className="font-bold text-main-900">다독이</span>도 몰라요~ 왜
            이래요~
          </div>
          <Button
            size="large"
            colorScheme="main"
            fill={false}
            onClick={() => router.replace('/')}
          >
            처음으로 돌아가기
          </Button>
        </div>
      </body>
    </html>
  );
};

export default ErrorPage;
