import { Box, Flex, Button } from '@chakra-ui/react';

const MeetingListHeader = () => {
  return (
    <Box>
      <Flex mb="1rem">
        <Box w="70%" fontSize="xl" fontWeight="700">
          모임
        </Box>
        <Flex justify="center" align="center" w="30%">
          <Button
            fontSize="sm"
            fontWeight="500"
            w="100%"
            borderRadius="2rem"
            color="main"
            backgroundColor="white.900"
            border="0.1rem solid"
          >
            모임 만들기
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MeetingListHeader;
