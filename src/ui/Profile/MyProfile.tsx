import useMySummaryBookshlefQuery from '@/queries/bookshelf/useMySummaryBookshelfQuery';
import useMyMeetingListQuery from '@/queries/meeting/useMyMeetingListQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import { Skeleton, SkeletonCircle, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Button from '../common/Button';
import ProfileBookshelf from './ProfileBookshelf';
import ProfileInfo from './ProfileInfo';
import ProfileGroup from './ProfileGroup';

const MyProfile = () => {
  const userProfileQuery = useMyProfileQuery();
  const bookshelfQuery = useMySummaryBookshlefQuery();
  const meetingListQuery = useMyMeetingListQuery();
  const { pathname, replace } = useRouter();

  useEffect(() => {
    if (!userProfileQuery.isSuccess) return;
    const {
      nickname,
      job: { jobGroupName, jobName },
    } = userProfileQuery.data;
    const isSavedAdditionalInfo = !!(nickname && jobGroupName && jobName);
    if (!isSavedAdditionalInfo) replace(`${pathname}/add`);
  }, [userProfileQuery, pathname, replace]);

  if (
    userProfileQuery.isLoading ||
    bookshelfQuery.isLoading ||
    meetingListQuery.isLoading
  )
    return (
      <VStack gap="2rem" align="stretch" w="100%">
        <SkeletonCircle size="8rem" />
        <Skeleton height="3rem" />
        <Skeleton height="4rem" />
        <Skeleton height="18rem" />
        <Skeleton height="25rem" />
      </VStack>
    );

  return (
    <VStack w="100%" align="flex-start" gap="2rem">
      {userProfileQuery.isSuccess && (
        <>
          <ProfileInfo {...userProfileQuery.data} />
          <Button
            as={Link}
            href={`${pathname}/edit`}
            scheme="orange"
            fullWidth
            bgColor="main"
            color="white.900"
          >
            프로필 수정
          </Button>
        </>
      )}

      {bookshelfQuery.isSuccess && (
        <ProfileBookshelf {...bookshelfQuery.data} />
      )}
      {meetingListQuery.isSuccess && (
        <ProfileGroup {...meetingListQuery.data} />
      )}
    </VStack>
  );
};

export default MyProfile;
