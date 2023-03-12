import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/auth';
import { Flex, Spinner } from '@chakra-ui/react';

const Logout = () => {
  const { isAuthed, removeAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    removeAuth();
    !isAuthed && router.push('/');
  });

  return (
    <Flex align="center" justify="center" height="95vh">
      <Spinner />
    </Flex>
  );
};

export default Logout;
