import {
  forwardRef,
  MenuItem as ChakraMenuItem,
  MenuItemProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

const MenuItem = forwardRef<
  MenuItemProps & { text?: string; children?: ReactNode },
  'button'
>(({ text, children, ...props }, ref) => {
  return (
    <ChakraMenuItem ref={ref} {...props}>
      {text}
      {children}
    </ChakraMenuItem>
  );
});

export { MenuItem };
