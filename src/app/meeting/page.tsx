'use client';
import { Box, Flex, Button } from '@chakra-ui/react';
import { css } from '@emotion/react';
import MeetingList from '@/ui/meetingList/MeetingList';

const Meeting = () => {
  return (
    <Flex justify="center">
      <Flex mt="2rem" w="90%" direction="column">
        <Box>
          <Flex mb="1rem">
            <Box w="70%" fontSize="2rem" fontWeight="700">
              모임
            </Box>
            <Flex justify="center" align="center" w="30%">
              <Button
                fontSize="1.3rem"
                fontWeight="900"
                w="100%"
                borderRadius="2rem"
                color="main"
                border="main 0.2rem solid"
                backgroundColor="white.900"
                css={css`
                border: #f6ad55 0.2rem solid;
              `}
              >
                모임 만들기
              </Button>
            </Flex>
          </Flex>
        </Box>
        <MeetingList />
      </Flex>
    </Flex>
  );
};

export default Meeting;
