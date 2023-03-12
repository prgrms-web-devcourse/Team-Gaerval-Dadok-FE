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
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import useMyprofileQuery from '@/queries/user/useMyProfileQuery';
import ProfileInfo from '@/ui/ProfileInfo';
import useMySummaryBookshlefQuery from '@/queries/bookshelf/useMySummaryBookshelfQuery';
import { ReactNode, Suspense, useEffect, useState } from 'react';
import ProfileBookshelf from '@/ui/ProfileBookshelf';
import useMyMeetingListQuery from '@/queries/meeting/useMyMeetingListQuery';
import MeetingListItem from '@/ui/Meeting/MeetingList/MeetingListItem';
import MoreIcon from '@public/icons/more.svg';
import Button from '@/ui/common/Button';

const MyProfilePage = () => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  return (
    <Container>
      <Page />
    </Container>
  );
};

export default MyProfilePage;

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <Flex direction="column" justify="center" gap="2rem">
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
      <Suspense
        fallback={
          <VStack gap="2rem" align="stretch">
            <SkeletonCircle size="8rem" />
            <Skeleton height="3rem" />
            <Skeleton height="4rem" />
            <Skeleton height="18rem" />
            <Skeleton height="25rem" />
          </VStack>
        }
      >
        {children}
      </Suspense>
    </Flex>
  );
};

const Page = () => {
  const userProfileQuery = useMyprofileQuery({ suspense: true });
  const bookshelfQuery = useMySummaryBookshlefQuery({ suspense: true });
  const meetingListQuery = useMyMeetingListQuery({ suspense: true });
  const router = useRouter();
  const pathname = router.pathname;

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
    <>
      {userProfileQuery.isSuccess && (
        <>
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
    </>
  );
};
