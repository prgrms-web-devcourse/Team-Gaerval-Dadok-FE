'use client';

import Image from 'next/image';
import { Flex, Button, Text, Highlight, Heading } from '@chakra-ui/react';

import BottomSheet from '@/ui/common/BottomSheet';
import Logo from './Logo';
import CloseButton from './CloseButton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginBottomSheet = ({ isOpen, onClose }: Props) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <Flex direction="column" align="center" gap="3rem" p="3rem 3rem 4rem">
        <CloseButton onCancel={onClose} alignSelf="flex-end" />
        <Logo />
        <Heading fontSize="lg">로그인이 필요한 서비스예요!</Heading>
        <Text
          color="black.500"
          fontSize="sm"
          fontWeight="medium"
          textAlign="center"
        >
          3초만에 카카오로 로그인을 하고,
          <br />
          <Highlight query="다독다독" styles={{ color: 'main' }}>
            다독다독의 다양한 서비스를 이용해보세요!
          </Highlight>
        </Text>
        <Button
          leftIcon={
            <Image
              src="/icons/kakao.svg"
              alt="카카오 로고"
              width={21}
              height={19}
              priority
            />
          }
          width="100%"
          height="4.2rem"
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
    </BottomSheet>
  );
};

export default LoginBottomSheet;
