import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const Layout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <Box h="100vh">
      <Box
        as={motion.div}
        key={pathname}
        px="2rem"
        pt="2rem"
        pb="9rem"
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
    </Box>
  );
};

export default Layout;
