import { isAuthed, removeAuth } from '@/utils/helpers';
import { Flex, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    isAuthed() && removeAuth();
    router.push('/');
  });

  return (
    <Flex align="center" justify="center" height="95vh">
      <Spinner />
    </Flex>
  );
};

export default Logout;
