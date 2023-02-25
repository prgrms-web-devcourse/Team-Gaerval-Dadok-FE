'use client';

import { Box } from '@chakra-ui/react';
import { NextPage } from 'next/types';

interface PropTypes {
  children: React.ReactNode;
}

const InteractiveBookContainer: NextPage<PropTypes> = ({ children }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{ perspective: '30rem', margin: '2rem' }}
    >
      {children}
    </Box>
  );
};

export default InteractiveBookContainer;
