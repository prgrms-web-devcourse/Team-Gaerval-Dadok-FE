import Image from 'next/image';
import { Flex, Text, Highlight } from '@chakra-ui/react';

import BottomSheet from '@/ui/common/BottomSheet';
import IconButton from '@/ui/common/IconButton';
import Button from '@/ui/common/Button';
import Logo from '@/ui/common/Logo';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginBottomSheet = ({ isOpen, onClose }: Props) => {
  const kakaoUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorize/kakao?redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_REDIRECT_URI}`;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <Flex direction="column" align="center" gap="3rem" p="3rem 3rem 4rem">
        <IconButton name="close" onClick={onClose} alignSelf="flex-end" />
        <Logo />
        <Text fontSize="lg" fontWeight="bold">
          로그인이 필요한 서비스예요!
        </Text>
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
        <Link href={kakaoUrl} style={{ width: '100%' }}>
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
        </Link>
      </Flex>
    </BottomSheet>
  );
};

export default LoginBottomSheet;
