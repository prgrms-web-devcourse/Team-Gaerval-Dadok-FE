import { Box, Image } from '@chakra-ui/react';

const Goback = () => {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <Box as="button" onClick={handleClick} mt="1rem">
      <Image src="/icons/back.svg" alt="뒤로가기" />
    </Box>
  );
};

export default Goback;
