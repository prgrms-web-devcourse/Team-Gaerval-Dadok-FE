import { Box, Flex, Button } from '@chakra-ui/react';
import Link from 'next/link';

const MeetingListHeader = () => {
  return (
    <Box width="100%">
      <Flex mb="1rem" justify="space-between">
        <Box w="70%" fontSize="2rem" fontWeight="700">
          모임
        </Box>
        <Flex align="center">
          <Link href="/meeting/create">
            <Button
              fontSize="1.4rem"
              fontWeight="500"
              w="100%"
              borderRadius="2rem"
              color="main"
              backgroundColor="white.900"
              border="0.1rem solid"
            >
              모임 만들기
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MeetingListHeader;
