import { Flex } from '@chakra-ui/react';

type UserTagType = {
  tag: string;
};

const UserJobInfoTag = ({ tag }: UserTagType) => {
  return (
    <Flex
      align="center"
      h="2.4rem"
      padding="0.6rem 1.2rem"
      color="main"
      fontSize="sm"
      border="solid 0.1rem"
      borderRadius="1.6rem"
    >
      {tag}
    </Flex>
  );
};

export default UserJobInfoTag;
