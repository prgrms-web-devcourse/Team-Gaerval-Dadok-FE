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

import type { APIBookInfo } from '@/types/book';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import LoginBottomSheet from '../LoginBottomSheet';

type Props = Pick<
  APIBookInfo,
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
    return '?????? ??? ?????? ????????? ?????? ????????? ?????????.';
  } else if (otherCount === 0) {
    return '?????? ??? ?????? ????????? ????????????.';
  }

  return `??? ${otherCount}?????? ??? ?????? ????????? ????????????.`;
};

export default BookInfo;
