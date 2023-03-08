import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box px="2rem" pt="2rem" mb="9rem">
      {children}
    </Box>
  );
};

export default Layout;
