import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import IconButton from '../IconButton';

type PageTitleType = {
  pageTitle: string;
};

const TopNavigation = ({ pageTitle }: PageTitleType) => {
  const router = useRouter();

  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      mb="1rem"
    >
      <IconButton name="back" size="2rem" onClick={() => router.back()} />
      <Text fontSize="lg" fontWeight="700">
        {pageTitle}
      </Text>
      <Box w="2rem"></Box>
    </Flex>
  );
};

export default TopNavigation;
