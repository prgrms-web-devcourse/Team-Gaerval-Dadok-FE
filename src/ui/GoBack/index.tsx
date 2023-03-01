import { Box, Image } from '@chakra-ui/react';

const Goback = () => {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <Box as="button" onClick={handleClick} p="1rem">
      <Image src="/icons/back.svg" alt="goBackIcon" />
    </Box>
  );
};

export default Goback;
