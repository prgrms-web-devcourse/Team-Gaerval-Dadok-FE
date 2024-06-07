'use client';

import Image from 'next/image';
import Link from 'next/link';

import { IconKakao } from '@public/icons';
import { KAKAO_LOGIN_URL } from '@/constants/url';

import Button from '@/v1/base/Button';

const LoginPage = () => {
  return (
    <>
      <article className="absolute inset-x-0 top-[15vh] flex w-full flex-col items-center gap-[2.3rem]">
        <Image
          src="/images/login-landing.jpg"
          alt="로그인랜딩이미지"
          width={300}
          height={270}
        />
        <p className="text-center !font-medium !leading-snug font-heading">
          <span className="font-subheading-regular">
            책에 대한 모든 이야기,
          </span>
          <br />
          <span className="font-bold text-main-900">다독다독</span>에서
          함께해요!
        </p>
      </article>

      <section className="absolute inset-x-[2rem] bottom-[2rem] flex flex-col justify-center gap-[1rem]">
        <Link href={KAKAO_LOGIN_URL}>
          <Button size="full" colorScheme="kakao">
            <div className="flex w-full items-center justify-center">
              <IconKakao className="absolute left-[2rem] w-[2.1rem]" />
              <p>카카오 로그인</p>
            </div>
          </Button>
        </Link>
        <Link href="/" className="flex justify-center">
          <Button
            size="small"
            colorScheme="grey"
            className="border-none !text-black-700 underline underline-offset-4 font-body2-regular"
            fill={false}
          >
            로그인하지 않고 둘러보기
          </Button>
        </Link>
      </section>
    </>
  );
};

export default LoginPage;
