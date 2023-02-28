import Image from 'next/image';
import { Box } from '@chakra-ui/react';
import { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<typeof Box> {
  onCancel?: () => void;
}

const CloseButton = ({ width = 24, onCancel, ...props }: Props) => {
  const height = width;
  return (
    <Box as="button" onClick={onCancel} {...props}>
      <Image
        src="/icons/close.svg"
        alt="취소하기 버튼"
        width={width}
        height={height}
      />
    </Box>
  );
};

export default CloseButton;
