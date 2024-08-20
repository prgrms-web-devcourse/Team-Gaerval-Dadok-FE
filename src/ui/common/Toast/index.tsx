import { toastsAtom } from '@/hooks/toast/atoms';
import { Box, Center } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import ToastItem from './ToastItem';

const Toast = () => {
  const toasts = useRecoilValue(toastsAtom);

  return (
    <Box position="fixed" width="100%" bottom="15rem" left={0} zIndex={10000}>
      <Center>
        {toasts.map(({ id, duration, message }) => (
          <ToastItem key={id} duration={duration}>
            {message}
          </ToastItem>
        ))}
      </Center>
    </Box>
  );
};

export default Toast;
