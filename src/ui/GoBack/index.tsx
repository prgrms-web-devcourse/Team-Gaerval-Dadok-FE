import { Box, Image } from '@chakra-ui/react';

const Goback = () => {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <Box as="button" onClick={handleClick}>
      <Image src="/icons/goBackIcon.svg" alt="goBackIcon" />
    </Box>
  );
};

export default Goback;
