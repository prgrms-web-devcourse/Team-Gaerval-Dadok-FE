'use client';

import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import useMyprofileQuery from '@/queries/user/useMyProfileQuery';
import ProfileInfo from '@/ui/ProfileInfo';
import useMySummaryBookshlefQuery from '@/queries/bookshelf/useMySummaryBookshelfQuery';
import { useEffect } from 'react';
import ProfileBookshelf from '@/ui/ProfileBookshelf';
import useMyMeetingListQuery from '@/queries/meeting/useMyMeetingListQuery';
import MeetingListItem from '@/ui/Meeting/MeetingList/MeetingListItem';

const MyProfilePage = () => {
  const userProfileQuery = useMyprofileQuery();
  const bookshelfQuery = useMySummaryBookshlefQuery();
  const meetingListQuery = useMyMeetingListQuery();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!userProfileQuery.isSuccess) return;
    const {
      nickname,
      job: { jobGroupName, jobName },
    } = userProfileQuery.data;
    const isSavedAdditionalInfo = !!(nickname && jobGroupName && jobName);
    if (!isSavedAdditionalInfo) router.replace(`${pathname}/add`);
  }, [userProfileQuery, pathname, router]);

  return (
    <Flex direction="column" justify="center" gap="2rem">
      {userProfileQuery.isSuccess && <ProfileInfo {...userProfileQuery.data} />}
      {bookshelfQuery.isSuccess && (
        <ProfileBookshelf {...bookshelfQuery.data} />
      )}
      {meetingListQuery.isSuccess && (
        <VStack>
          <Text alignSelf="flex-start" fontSize="sm">
            내가 참여한 모임
          </Text>
          <Box w="100%" overflow="auto">
            <Flex>
              {meetingListQuery.data.bookGroups.map(meeting => (
                <Box
                  key={meeting.bookGroupId}
                  w="95%"
                  flex="1 0 auto"
                  px="0.3rem"
                >
                  <MeetingListItem {...meeting} />
                </Box>
              ))}
            </Flex>
          </Box>
        </VStack>
      )}
      <Box
        as={Link}
        href={`${pathname}/edit`}
        px="2rem"
        py="1rem"
        color="main"
        border="1px solid"
        borderRadius="5rem"
        textAlign="center"
        fontSize="md"
      >
        프로필 수정
      </Box>
    </Flex>
  );
};

export default MyProfilePage;
