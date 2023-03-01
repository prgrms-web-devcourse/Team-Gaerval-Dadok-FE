'use client';

import { Box } from '@chakra-ui/react';

type UserTagType = {
  tag: string;
};

const UsersBookShelfTag = ({ tag }: UserTagType) => {
  return (
    <Box
      padding="0.2rem 1.4rem"
      color="main"
      fontSize="sm"
      border="solid 0.1rem"
      borderRadius="1.2rem"
    >
      {tag}
    </Box>
  );
};

export default UsersBookShelfTag;
