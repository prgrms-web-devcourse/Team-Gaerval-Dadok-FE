import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import { publicApi } from '@/apis/core/axios';
import useAxiosInterceptor from '@/hooks/useAxiosInterceptor';
import BottomNavigation from '@/ui/BottomNavigation';
import Toast from '../Toast';

const paths = ['/bookarchive', '/book/search', '/group', '/profile/me'];

const Layout = ({ children }: { children: ReactNode }) => {
  useAxiosInterceptor(publicApi);
  const { pathname } = useRouter();
  const isShowNavigation = pathname && paths.includes(pathname);

  return (
    <Box h={isShowNavigation ? '100%' : '100vh'}>
      <Box
        as={motion.div}
        key={pathname}
        px="2rem"
        pt="2rem"
        pb={isShowNavigation ? '9rem' : '2rem'}
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
      {isShowNavigation && <BottomNavigation />}
      <Toast />
    </Box>
  );
};

export default Layout;
