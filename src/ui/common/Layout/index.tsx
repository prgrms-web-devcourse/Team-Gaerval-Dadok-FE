import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import BottomNavigation from '@/ui/BottomNavigation';

const paths = ['/login/', '/profile/me/add/'];

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isShowNavigation = pathname === null || paths.includes(pathname);
  return (
    <AnimatePresence mode="wait">
      <Box h="100vh">
        <Box
          as={motion.div}
          key={pathname}
          px="2rem"
          pt="2rem"
          pb={!isShowNavigation ? '9rem' : '2rem'}
          h="100%"
          overflow="auto"
          variants={{
            in: {
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0.1,
              },
            },
            out: {
              opacity: 0,
              transition: {
                duration: 0.5,
              },
            },
          }}
          animate="in"
          initial="out"
        >
          {children}
        </Box>
        {!isShowNavigation && <BottomNavigation />}
      </Box>
    </AnimatePresence>
  );
};

export default Layout;
