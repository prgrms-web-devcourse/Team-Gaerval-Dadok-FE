'use client';

import Image from 'next/image';
import { Flex, Text, Highlight, Heading } from '@chakra-ui/react';

import BottomSheet from '@/ui/common/BottomSheet';
import IconButton from '@/ui/common/IconButton';
import Button from '@/ui/common/Button';
import Logo from '@/ui/common/Logo';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginBottomSheet = ({ isOpen, onClose }: Props) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <Flex direction="column" align="center" gap="3rem" p="3rem 3rem 4rem">
        <IconButton onClick={onClose} alignSelf="flex-end">
          <Image
            src="/icons/close.svg"
            alt="취소하기 버튼"
            width={24}
            height={24}
          />
        </IconButton>
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
        <Button scheme="kakao" fullWidth>
          <Image
            src="/images/kakao.svg"
            alt="카카오 로고"
            width={21}
            height={19}
            priority
          />
          카카오 로그인
        </Button>
      </Flex>
    </BottomSheet>
  );
};

export default LoginBottomSheet;
