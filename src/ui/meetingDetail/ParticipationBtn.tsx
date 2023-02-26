import { Box, Button } from '@chakra-ui/react';

const ParticipationBtn = () => {
  return (
    <Box mt="1.5rem">
      <Button
        w="100%"
        h="2.8rem"
        fontSize="1.4rem"
        fontWeight="500"
        borderRadius="2rem"
        color="main"
        border="0.1rem solid"
        backgroundColor="white.900"
      >
        모임 참여하기
      </Button>
    </Box>
  );
};

export default ParticipationBtn;
