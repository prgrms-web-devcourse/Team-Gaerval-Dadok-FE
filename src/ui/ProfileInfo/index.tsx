import { APIProfileBookshelf } from '@/types/bookshelf';
import { APIUser } from '@/types/user';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import InteractiveBookShelf from '../InteractiveBookShelf';

const ProfileInfo = ({
  user,
  summaryBookshelf,
  children,
}: {
  user: APIUser;
  summaryBookshelf: APIProfileBookshelf;
  children?: ReactNode;
}) => {
  const { nickname, profileImage, email, job } = user;
  const { jobGroupKoreanName, jobNameKoreanName } = job;
  const { bookshelfName, books } = summaryBookshelf;
  return (
    <Flex direction="column" justify="center" gap="2rem" pt="4rem" px="2rem">
      <Flex width="100%" gap="1.5rem">
        <Avatar src={profileImage} name={nickname} w="8rem" h="8rem" />
        <Flex direction="column" justify="center">
          <Text fontSize="xl">{nickname}</Text>
          <Text fontSize="sm">{email}</Text>
        </Flex>
      </Flex>
      <Box>
        <Text fontSize="sm">직군 / 직업</Text>
        <Text fontSize="md">
          {jobGroupKoreanName && jobNameKoreanName
            ? `${jobGroupKoreanName} / ${jobNameKoreanName}`
            : '직업이 등록되지 않았습니다.'}
        </Text>
      </Box>
      <Box>
        <Text as={Link} href="/usersbookshelf" fontSize="sm">
          {bookshelfName}
        </Text>
        {books.length === 0 ? (
          <Text fontSize="md">책장이 비어있습니다.</Text>
        ) : (
          <InteractiveBookShelf bookList={books} />
        )}
      </Box>
      {children}
    </Flex>
  );
};

export default ProfileInfo;
