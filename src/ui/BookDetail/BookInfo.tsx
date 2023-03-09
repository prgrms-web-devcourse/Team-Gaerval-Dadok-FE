'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Text,
  useTheme,
  VStack,
} from '@chakra-ui/react';

import IconButton from '@/ui/common/IconButton';
import bookAPI from '@/apis/book';

import type { APIBookInfo } from '@/types/book';

type Props = Pick<
  APIBookInfo,
  'title' | 'author' | 'contents' | 'imageUrl' | 'bookId'
>;

const BookInfo = ({ bookId, title, author, contents, imageUrl }: Props) => {
  const theme = useTheme();
  const [bookmark, setBookMarked] = useState(false);

  const handleBookmarkClick = () => {
    setBookMarked(!bookmark);
  };

  useEffect(() => {
    if (bookmark) {
      bookAPI.setBookMarked(bookId).then(({ data }) => data);
    }
  }, [bookmark, bookId]);

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
      <Text fontSize="md">{contents}</Text>
      <Flex align="center" gap="0.8rem">
        <AvatarGroup max={2}>
          <Avatar></Avatar>
          <Avatar></Avatar>
          <Avatar></Avatar>
          <Avatar></Avatar>
          <Avatar></Avatar>
        </AvatarGroup>
        <Text fontSize="sm">외 3명이 이 책을 책장에 꽂았습니다.</Text>
      </Flex>
    </>
  );
};

export default BookInfo;
