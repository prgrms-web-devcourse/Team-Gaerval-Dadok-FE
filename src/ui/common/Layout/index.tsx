import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
// import BottomNavigation from '@/ui/BottomNavigation';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box h="100vh">
      <Box px="2rem" pt="2rem" pb="9rem" h="100%" overflow="auto">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
