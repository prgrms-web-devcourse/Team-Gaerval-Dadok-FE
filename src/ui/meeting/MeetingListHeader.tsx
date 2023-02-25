import { Box, Flex, Button } from '@chakra-ui/react';
import { css } from '@emotion/react';

const MeetingListHeader = () => {
  return (
    <Box>
      <Flex mb="1rem">
        <Box w="70%" fontSize="2rem" fontWeight="700">
          모임
        </Box>
        <Flex justify="center" align="center" w="30%">
          <Button
            fontSize="1.3rem"
            fontWeight="500"
            w="100%"
            borderRadius="2rem"
            color="main"
            backgroundColor="white.900"
            css={css`
          border: #f6ad55 0.1rem solid;
        `}
          >
            모임 만들기
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default MeetingListHeader;
