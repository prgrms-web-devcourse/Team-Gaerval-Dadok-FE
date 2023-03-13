import useMySummaryBookshlefQuery from '@/queries/bookshelf/useMySummaryBookshelfQuery';
import useMyMeetingListQuery from '@/queries/meeting/useMyMeetingListQuery';
import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import { VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Button from '../common/Button';
import ProfileBookshelf from './ProfileBookshelf';
import ProfileInfo from './ProfileInfo';
import ProfileMeeting from './ProfileMeeting';

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
  return (
    <VStack w="100%" align="flex-start">
      {userProfileQuery.isSuccess && (
        <ProfileInfo {...userProfileQuery.data}>
          <Button as={Link} href={`${pathname}/edit`} scheme="orange" fullWidth>
            프로필 수정
          </Button>
        </ProfileInfo>
      )}
      {bookshelfQuery.isSuccess && (
        <ProfileBookshelf {...bookshelfQuery.data} />
      )}
      {meetingListQuery.isSuccess && (
        <ProfileMeeting {...meetingListQuery.data} />
      )}
    </VStack>
  );
};

export default MyProfile;
