import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex, Spinner } from '@chakra-ui/react';

import { useAuth } from '@/hooks/auth';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';

const RedirectPage = () => {
  const router = useRouter();

  const { access_token: accessToken } = router.query as {
    access_token: string;
  };
  const { isAuthed, setAuth } = useAuth();
  const { isSuccess, data, refetch } = useMyProfileQuery({ enabled: isAuthed });

  useEffect(() => {
    const isAuthed = !!accessToken;

    if (isAuthed) {
      accessToken && setAuth(accessToken);
      refetch();
    }
  }, [accessToken, refetch, setAuth]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    const {
      job: { jobName, jobGroupName },
      nickname,
    } = data;
    const isSavedAdditioanlInfo = !!(nickname && jobGroupName && jobName);

    if (!isSavedAdditioanlInfo) {
      router.replace('/profile/me/add');
      return;
    }

    router.replace('/bookarchive');
  }, [data, isSuccess, router]);

  return (
    <Flex align="center" justify="center" height="95vh">
      <Spinner />
    </Flex>
  );
};

export default RedirectPage;
