'use client';

import { useDisclosure, Button } from '@chakra-ui/react';

import LoginBottomSheet from '@/ui/LoginBottomSheet';

const Login = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>로그인</Button>
      <LoginBottomSheet onClose={onClose} isOpen={isOpen} />
    </>
  );
};

export default Login;
