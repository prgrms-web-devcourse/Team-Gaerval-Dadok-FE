import {
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
  IconButton,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import MoreIcon from '@public/icons/more.svg';

const Menu = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraMenu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<MoreIcon />}
        background="inherit"
        border="none"
      />
      <MenuList fontSize="md">{children}</MenuList>
    </ChakraMenu>
  );
};

export { Menu };
