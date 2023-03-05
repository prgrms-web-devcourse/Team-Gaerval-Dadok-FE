'use client';

import { Flex } from '@chakra-ui/react';
import UserForm from '@/ui/ProfileForm';

const EditMyPage = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      gap="2rem"
      py="4rem"
    >
      <UserForm />
    </Flex>
  );
};

export default EditMyPage;
