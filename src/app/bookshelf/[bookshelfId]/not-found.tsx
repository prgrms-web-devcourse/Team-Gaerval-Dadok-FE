import Link from 'next/link';
import Image from 'next/image';

import Button from '@/components/common/Button';

export default function NotFound() {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-[2rem]">
      <Image src="/images/loading.gif" width={230} height={160} alt="loading" />
      <p className="font-heading-bold">
        <span className="font-bold text-main-900">다독이</span>가 길을 잃었어요.
      </p>
      <Link href="/bookarchive">
        <Button size="large" colorScheme="main" fill={false}>
          책장 둘러보기
        </Button>
      </Link>
    </div>
  );
}
