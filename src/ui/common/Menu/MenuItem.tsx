import {
  forwardRef,
  MenuItem as ChakraMenuItem,
  MenuItemProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

const MenuItem = forwardRef<
  MenuItemProps & { text?: string; render?: () => ReactNode },
  'button'
>(({ text, render, ...props }, ref) => {
  return (
    <ChakraMenuItem ref={ref} {...props}>
      {text}
      {render && render()}
    </ChakraMenuItem>
  );
});

export { MenuItem };
