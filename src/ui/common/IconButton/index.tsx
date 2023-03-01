'use client';

import { PropsWithChildren, ComponentPropsWithoutRef } from 'react';
import { Center } from '@chakra-ui/react';

interface Props extends ComponentPropsWithoutRef<typeof Center> {
  size?: number | `${number}`;
}

const IconButton = ({ size, children, ...props }: PropsWithChildren<Props>) => {
  return (
    <Center as="button" width={size} height={size} {...props}>
      {children}
    </Center>
  );
};

export default IconButton;
