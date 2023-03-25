import Image from 'next/image';
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

import IconButton from '@/ui/common/IconButton';
import bookAPI from '@/apis/book';
import useBookUserInfoQuery from '@/queries/book/useBookUserInfoQuery';

import type { APIBookDetail } from '@/types/book';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import LoginBottomSheet from '../LoginBottomSheet';

type Props = Pick<
  APIBookDetail,
  'title' | 'author' | 'contents' | 'imageUrl' | 'bookId'
>;

const BookInfo = ({ bookId, title, author, contents, imageUrl }: Props) => {
  const theme = useTheme();
  const { isAuthed } = useAuth();
  const bookUserQueryInfo = useBookUserInfoQuery(bookId, { enabled: isAuthed });
  const {
    isOpen: isLoginBottomSheetOpen,
    onOpen: onLoginBottomSheetOpen,
    onClose: onLoginBottomSheetsClose,
  } = useDisclosure();

  const handleBookmarkClick = () => {
    if (!bookUserQueryInfo.isSuccess || !isAuthed) {
      onLoginBottomSheetOpen();
      return;
    }

    if (bookUserQueryInfo.data.isInMyBookshelf) {
      bookAPI.unsetBookMarked(bookId).then(() => {
        bookUserQueryInfo.refetch();
      });
    } else {
      bookAPI.setBookMarked(bookId).then(() => {
        bookUserQueryInfo.refetch();
      });
    }
  };

  return (
    <>
      <Flex gap="2rem" align="flex-end">
        <Box shadow="lg">
          <Image src={imageUrl} alt="book" width={180} height={240} />
        </Box>
        <VStack align="flex-start">
          <IconButton
            name="bookmark"
            color={theme.colors.main}
            strokeWidth="0.15rem"
            onClick={handleBookmarkClick}
            fill={
              bookUserQueryInfo.isSuccess &&
              bookUserQueryInfo.data.isInMyBookshelf
            }
            mb="0.5rem"
            ml="-0.1rem"
          />
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          <Text fontSize="sm">{author}</Text>
        </VStack>
      </Flex>
      <Text fontSize="md">{contents}</Text>

      {!isAuthed && (
        <LoginBottomSheet
          isOpen={isLoginBottomSheetOpen}
          onClose={onLoginBottomSheetsClose}
        />
      )}
      {bookUserQueryInfo.isSuccess && (
        <Flex align="center" minH="2rem">
          <AvatarGroup>
            {bookUserQueryInfo.data.users.map(({ userId, profileImage }) => (
              <Avatar
                as={Link}
                href={`/profile/${userId}`}
                key={userId}
                src={profileImage}
              />
            ))}
          </AvatarGroup>
          <Text fontSize="sm" pl="0.8rem">
            {getUserInfoText(
              bookUserQueryInfo.data.totalCount,
              bookUserQueryInfo.data.users.length
            )}
          </Text>
        </Flex>
      )}
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
