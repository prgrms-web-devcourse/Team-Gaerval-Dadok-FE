import { Box, Center, Flex } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import IconButton from '@/ui/common/IconButton';
import type { PropsWithChildren } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel?: () => void;
}

const Drawer = ({
  isOpen,
  onClose,
  onCancel,
  children,
}: PropsWithChildren<DrawerProps>) => {
  const handleClickOverlay = () => {
    onCancel && onCancel();
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'overlay';
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Center
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          height="100dvh"
          alignItems="end"
          zIndex={10}
        >
          <Box
            as={motion.div}
            onClick={handleClickOverlay}
            position="absolute"
            backgroundColor="black"
            width="100%"
            height="100%"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          />
          <Flex
            as={motion.div}
            direction="column"
            w="43rem"
            p="1rem"
            borderTopRadius="xl"
            backgroundColor="white"
            initial={{ y: '100%', opacity: 1 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.3, bounce: 0 },
            }}
            exit={{ y: '100%', opacity: 0, transition: { duration: 0.2 } }}
          >
            <IconButton
              name="close"
              size="2.5rem"
              onClick={handleClickOverlay}
              alignSelf="end"
              m="1rem"
            />
            {children}
          </Flex>
        </Center>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
