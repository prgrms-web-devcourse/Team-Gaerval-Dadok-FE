'use client';

import { Box } from '@chakra-ui/react';

type UserTagType = {
  tag: string;
};

const UserJobInfoTag = ({ tag }: UserTagType) => {
  return (
    <Box
      padding="0.12rem 0.8rem"
      color="main"
      fontSize="sm"
      border="solid 0.1rem"
      borderRadius="1.6rem"
    >
      {tag}
    </Box>
  );
};

export default UserJobInfoTag;
