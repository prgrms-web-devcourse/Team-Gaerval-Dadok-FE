'use client';

import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import { useTheme, Flex } from '@chakra-ui/react';
import type { Scheme } from '@/styles/theme';

interface Props extends Partial<ComponentPropsWithoutRef<typeof Flex>> {
  scheme?: keyof Scheme['button'];
  fullWidth?: boolean;
}

const Button = ({
  scheme = 'orange',
  fullWidth = false,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const theme = useTheme();

  return (
    <Flex
      as="button"
      justify="center"
      align="center"
      gap="1rem"
      width={fullWidth ? '100%' : 'fit-content'}
      height="4.5rem"
      p="2.5rem 1.8rem"
      fontSize="md"
      fontWeight="bold"
      borderRadius="1.2rem"
      {...theme.scheme.button[scheme]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Button;
