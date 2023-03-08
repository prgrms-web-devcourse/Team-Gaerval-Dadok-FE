import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import BottomNavigation from '@/ui/BottomNavigation';

const paths = ['/login/', '/profile/me/add/'];

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isShowNavigation = pathname === null || paths.includes(pathname);
  return (
    <Box h="100vh">
      <Box
        as={motion.div}
        key={pathname}
        px="2rem"
        pt="2rem"
        pb={!isShowNavigation ? '9rem' : '2rem'}
        h="100%"
        overflow="auto"
        initial="initial"
        animate="animate"
        variants={{
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
          },
        }}
      >
        {children}
      </Box>
      {!isShowNavigation && <BottomNavigation />}
    </Box>
  );
};

export default Layout;
