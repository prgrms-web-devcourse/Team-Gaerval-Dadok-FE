'use clinet';

import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Flex,
  VStack,
  Text,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
} from '@chakra-ui/react';

interface APIBookComment {
  userId: number;
  nickName: string;
  profileImageUrl: string;
  createdAt: string;
  contents: string;
}

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

const BookCommentList = ({ bookId }: Props) => {
  const comments: APIBookComment[] = getBookComments(bookId);
  return (
    comments && (
      <VStack align="stretch" spacing="2rem" width="100%">
        {comments.map(props => (
          <Comment key={props.userId} {...props} />
        ))}
      </VStack>
    )
  );
};

const Comment = ({
  nickName,
  profileImageUrl,
  createdAt,
  contents,
}: APIBookComment) => {
  return (
    <VStack align="flex-start">
      <Flex gap="1rem" align="center" width="100%">
        <Avatar src={profileImageUrl} />
        <VStack flexGrow="1" align="flex-start">
          <Text fontSize="sm" fontWeight="bold">
            {nickName}
          </Text>
          <Text fontSize="xs" style={{ margin: 0 }} color="black.500">
            {createdAt}
          </Text>
        </VStack>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            background="inherit"
            border="none"
          />
          <MenuList fontSize="md">
            <MenuItem>수정</MenuItem>
            <MenuItem>삭제</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Text fontSize="md" py="0.5rem">
        {contents}
      </Text>
    </VStack>
  );
};

export default BookCommentList;
