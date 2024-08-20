import { ToastAtom } from '@/hooks/toast/atoms';
import { Box } from '@chakra-ui/react';
import { PropsWithChildren, useEffect, useState } from 'react';

const ToastItem = ({
  duration,
  children,
}: PropsWithChildren<Pick<ToastAtom, 'duration'>>) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 100);

    const handleSetTimeout = setTimeout(() => {
      setVisible(false);
      clearTimeout(handleSetTimeout);
    }, duration);
  }, [duration]);

  return (
    <Box
      position="absolute"
      maxW="43rem"
      px="2rem"
      opacity={visible ? '0.95' : '0'}
      transition="all 0.5s ease-in-out"
    >
      <Box
        color="white"
        borderRadius={15}
        textAlign="center"
        bg="main"
        fontSize="md"
        fontWeight="bold"
        py="2rem"
        px="2rem"
      >
        {children}
      </Box>
    </Box>
  );
};

export default ToastItem;
