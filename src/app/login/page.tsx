'use client';

import { Highlight, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/ui/common/Button';
import Logo from '@/ui/common/Logo';

const LoginPage = () => {
  const kakaoUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorize/kakao?redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_REDIRECT_URI}`;

  return (
    <VStack
      align="center"
      justify="center"
      pos="relative"
      zIndex="1"
      bgColor="white.800"
      h="100%"
      gap="26rem"
    >
      <VStack w="100%" align="flex-start" spacing="3rem" px="2rem">
        <Logo width={65} />
        <Text fontSize="2xl" fontWeight="normal">
          책에 대한 모든 이야기
          <br />
          <Highlight
            query="다독다독"
            styles={{ color: 'main', fontWeight: 'bold' }}
          >
            다독다독에서 함께 해요
          </Highlight>
        </Text>
      </VStack>
      <Link href={kakaoUrl} style={{ width: '100%' }}>
        <Button scheme="kakao" fullWidth>
          <Image
            src="/icons/kakao-legacy.svg"
            alt="카카오 로고"
            width={21}
            height={19}
            priority
          />
          카카오 로그인
        </Button>
      </Link>
    </VStack>
  );
};

export default LoginPage;
