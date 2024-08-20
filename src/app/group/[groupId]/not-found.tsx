import Button from '@/v1/base/Button';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-[2rem]">
      <Image src="/images/loading.gif" width={230} height={160} alt="loading" />
      <p className="font-heading-bold">
        <span className="font-bold text-main-900">다독이</span>가 길을 잃었어요.
      </p>
      <Link href="/group">
        <Button size="large" colorScheme="main" fill={false}>
          모임 둘러보기
        </Button>
      </Link>
    </div>
  );
}
