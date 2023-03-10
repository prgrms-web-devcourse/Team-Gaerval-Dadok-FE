'use clinet';

import { useState } from 'react';
import { VStack } from '@chakra-ui/react';

import Button from '@/ui/common/Button';
import BookComment from './BookComment';
import CreateCommentDrawer from './CreateCommentDrawer';

import type { APIBookComment } from './type';

interface Props {
  bookId: number;
}

/** @todo react query로 대체하기 */
const getBookComments = (_id: number) => {
  return [
    {
      userId: 1,
      nickName: '계란',
      profileImageUrl:
        'http://k.kakaocdn.net/dn/bjK45U/btrWRWU4xna/eK9gq12S5wMiROieJDvIuK/img_640x640.jpg',
      createdAt: '방금 전',
      contents: '요즘 핫한 챗GPT에 대한 내용을 잘 담은 책입니다.',
    },
    {
      userId: 2,
      nickName: '후라이',
      profileImageUrl:
        'http://k.kakaocdn.net/dn/bjK45U/btrWRWU4xna/eK9gq12S5wMiROieJDvIuK/img_640x640.jpg',
      createdAt: '2022.02.27',
      contents: '굿굿!',
    },
  ];
};

const _getMyComment = () => {
  return {
    userId: 1,
    nickName: '계란',
    profileImageUrl:
      'http://k.kakaocdn.net/dn/bjK45U/btrWRWU4xna/eK9gq12S5wMiROieJDvIuK/img_640x640.jpg',
    createdAt: '방금 전',
    contents: '요즘 핫한 챗GPT에 대한 내용을 잘 담은 책입니다.',
  };
};

const BookCommentList = ({ bookId }: Props) => {
  const myComment: APIBookComment | null = null;
  const userComments: APIBookComment[] = getBookComments(bookId);

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawerOpen = () => {
    setOpenDrawer(isOpen => !isOpen);
  };

  return (
    <>
      {myComment ? (
        <BookComment
          nickName="잇츠미"
          profileImageUrl=""
          createdAt="3일 전"
          contents="정말 어려운 내용이에요."
          editable
          style={{ border: '1px solid #ffe6c6' }}
        />
      ) : (
        <>
          <Button
            onClick={toggleDrawerOpen}
            scheme="orange-fill"
            mt="2rem"
            fullWidth
          >
            코멘트 남기기
          </Button>
          <CreateCommentDrawer
            bookId={bookId}
            isOpen={openDrawer}
            onClose={toggleDrawerOpen}
          />
        </>
      )}
      <VStack align="stretch" spacing="2rem" width="100%" pt="2rem">
        {userComments.map(({ userId, ...props }) => (
          <BookComment key={userId} {...props} />
        ))}
      </VStack>
    </>
  );
};

export default BookCommentList;
