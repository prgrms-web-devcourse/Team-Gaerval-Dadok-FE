import { PropsWithChildren, ComponentProps } from 'react';
import { useTheme, Flex } from '@chakra-ui/react';

import type { ChakraTheme } from '@/styles/theme';

type Props = ComponentProps<typeof Flex> & {
  size?: keyof ChakraTheme['buttonSizes'];
  scheme?: keyof ChakraTheme['scheme']['button'];
  fullWidth?: boolean;
};

const Button = ({
  size = 'lg',
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
      fontSize={size}
      fontWeight="bold"
      borderRadius="1.2rem"
      {...theme.buttonSizes[size]}
      {...theme.scheme.button[scheme]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Button;
