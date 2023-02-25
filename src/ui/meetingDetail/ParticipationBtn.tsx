'use client';
import { Box, Button } from '@chakra-ui/react';
import { css } from '@emotion/react';

const ParticipationBtn = () => {
  return (
    <Box className="모임 참여 버튼" mt="1.5rem">
      <Button
        w="100%"
        h="2.8rem"
        fontSize="1.3rem"
        fontWeight="500"
        borderRadius="2rem"
        color="main"
        border="main 0.2rem solid"
        backgroundColor="white.900"
        css={css`
          border: #f6ad55 0.1rem solid;
        `}
      >
        모임 참여하기
      </Button>
    </Box>
  );
};

export default ParticipationBtn;
