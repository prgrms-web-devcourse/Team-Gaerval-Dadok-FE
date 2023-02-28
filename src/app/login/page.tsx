'use client';

import Image from 'next/image';
import { Button, Flex, Heading, Highlight, VStack } from '@chakra-ui/react';

const LoginPage = () => {
  return (
    <Flex
      height="100vh"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      p="22vh 5rem"
      pos="relative"
      zIndex="1"
      bgColor="white.800"
    >
      <VStack w="100%" align="flex-start" spacing="3rem">
        <Image
          src="/images/logo.svg"
          alt="다독다독 로고"
          width={65}
          height={65 * (70 / 71)}
          priority
        />
        <Heading fontSize="2xl" fontWeight="medium">
          책에 대한 모든 이야기
          <br />
          <Highlight
            query="다독다독"
            styles={{ color: 'main', fontWeight: 'bold' }}
          >
            다독다독에서 함께 해요
          </Highlight>
        </Heading>
      </VStack>
      <Button
        leftIcon={
          <Image
            src="/images/kakao.svg"
            alt="카카오 로고"
            width={21}
            height={19}
            priority
          />
        }
        width="100%"
        height="4.5rem"
        p="1.8rem 2.5rem"
        color="kakao.brown"
        bgColor="kakao.yellow"
        fontSize="md"
        fontWeight="bold"
        iconSpacing="1rem"
        borderRadius="1.2rem"
      >
        카카오 로그인
      </Button>
    </Flex>
  );
};

export default LoginPage;
