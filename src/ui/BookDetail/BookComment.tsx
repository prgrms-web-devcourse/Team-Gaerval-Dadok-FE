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

import MoreIcon from '@public/icons/more.svg';

import type { CSSProperties } from 'react';
import type { APIBookComment } from '@/types/book';

interface Props
  extends Pick<
    APIBookComment,
    'nickname' | 'userProfileImage' | 'createdAt' | 'contents'
  > {
  style?: CSSProperties;
  editable?: boolean;
}

const BookComment = ({
  nickname,
  userProfileImage,
  createdAt,
  contents,
  editable = false,
  ...props
}: Props) => {
  return (
    <VStack
      width="100%"
      align="flex-start"
      backgroundColor="white.900"
      borderRadius="1rem"
      p="2rem"
      {...props}
    >
      <Flex gap="1rem" align="center" width="100%">
        <Avatar src={userProfileImage} />
        <VStack flexGrow="1" align="flex-start">
          <Text fontSize="sm" fontWeight="bold">
            {nickname}
          </Text>
          <Text fontSize="xs" style={{ margin: 0 }} color="black.500">
            {createdAt}
          </Text>
        </VStack>
        {editable && (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<MoreIcon />}
              background="inherit"
              border="none"
            />
            <MenuList fontSize="md">
              <MenuItem>수정</MenuItem>
              <MenuItem color="red.300">삭제</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      <Text fontSize="md" py="0.5rem">
        {contents}
      </Text>
    </VStack>
  );
};

export default BookComment;
