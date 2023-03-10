'use client';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from '@chakra-ui/react';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import useMyprofileQuery from '@/queries/user/useMyProfileQuery';
import ProfileInfo from '@/ui/ProfileInfo';
import useMySummaryBookshlefQuery from '@/queries/bookshelf/useMySummaryBookshelfQuery';
import { useEffect } from 'react';
import ProfileBookshelf from '@/ui/ProfileBookshelf';
import useMyMeetingListQuery from '@/queries/meeting/useMyMeetingListQuery';
import MeetingListItem from '@/ui/Meeting/MeetingList/MeetingListItem';
import MoreIcon from '@public/icons/more.svg';
import Button from '@/ui/common/Button';

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
      {userProfileQuery.isSuccess && (
        <>
          <Box alignSelf="flex-end">
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<MoreIcon />}
                background="inherit"
                border="none"
              />
              <MenuList fontSize="md">
                <MenuItem as={Link} href={'/logout'}>
                  로그아웃
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <ProfileInfo {...userProfileQuery.data} />
          <Button as={Link} href={`${pathname}/edit`} scheme="orange" fullWidth>
            프로필 수정
          </Button>
        </>
      )}
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
    </Flex>
  );
};

export default MyProfilePage;
