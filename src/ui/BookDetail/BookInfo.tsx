import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Text,
  useDisclosure,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';

import IconButton from '@/ui/common/IconButton';

import type { APIBookDetail, APIBookmarkedUserList } from '@/types/book';
import Link from 'next/link';

import { isAuthed } from '@/utils/helpers';
import { useState } from 'react';
import LoginBottomSheet from '../LoginBottomSheet';

type Props = Pick<
  APIBookDetail,
  'title' | 'author' | 'contents' | 'imageUrl' | 'url'
> &
  Omit<APIBookmarkedUserList, 'bookId'> & {
    onBookmarkClick: (isBookMarked: boolean) => void;
  };

const BookInfo = ({
  title,
  author,
  contents,
  imageUrl,
  url: contentsUrl,
  onBookmarkClick,
  ...bookmarkInfo
}: Props) => {
  const theme = useTheme();
  const [bookmark, setBookmark] = useState(bookmarkInfo.isInMyBookshelf);

  const {
    isOpen: isLoginBottomSheetOpen,
    onOpen: onLoginBottomSheetOpen,
    onClose: onLoginBottomSheetsClose,
  } = useDisclosure();

  const handleBookmarkClick = () => {
    if (!isAuthed()) {
      onLoginBottomSheetOpen();
      return;
    }

    setBookmark(prev => {
      const next = !prev;
      onBookmarkClick(next);
      return next;
    });
  };

  return (
    <>
      <Flex gap="2rem" align="flex-end">
        <Box
          shadow="lg"
          position="relative"
          width="18rem"
          height="24rem"
          flexShrink={0}
        >
          <Image
            src={imageUrl.replace('R120x174.q85', 'R300x0.q100')}
            alt="book"
            fill
            sizes="300px"
          />
        </Box>
        <VStack align="flex-start">
          <IconButton
            name="bookmark"
            color={theme.colors.main}
            strokeWidth="0.15rem"
            onClick={handleBookmarkClick}
            fill={bookmark}
            mb="0.5rem"
            ml="-0.1rem"
          />
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm">{author}</Text>
        </VStack>
      </Flex>
      <Text fontSize="md">
        {contents}&nbsp;...&nbsp;
        {contentsUrl && (
          <Text
            as={Link}
            href={contentsUrl}
            color="main"
            target="_blank"
            rel="noopener noreferrer"
          >
            더보기
          </Text>
        )}
      </Text>

      {!isAuthed() && (
        <LoginBottomSheet
          isOpen={isLoginBottomSheetOpen}
          onClose={onLoginBottomSheetsClose}
        />
      )}

      <Flex align="center" minH="2rem">
        <AvatarGroup>
          {bookmarkInfo.users.map(({ userId, profileImage }) => (
            <Avatar
              as={Link}
              href={`/profile/${userId}`}
              key={userId}
              src={profileImage}
            />
          ))}
        </AvatarGroup>
        <Text fontSize="sm" pl="0.8rem">
          {getUserInfoText(bookmarkInfo.totalCount, bookmarkInfo.users.length)}
        </Text>
      </Flex>
    </>
  );
};

const getUserInfoText = (totalCount: number, avatarCount: number) => {
  const otherCount = totalCount - avatarCount;

  if (otherCount === 0 && totalCount === 0) {
    return '아직 이 책을 책장에 꽂은 사람이 없어요.';
  } else if (otherCount === 0) {
    return '님이 이 책을 책장에 꽂았어요.';
  }

  return `외 ${otherCount}명이 이 책을 책장에 꽂았어요.`;
};

export default BookInfo;
