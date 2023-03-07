'use client';

import { PropsWithChildren } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  UseDisclosureProps,
} from '@chakra-ui/react';

type Props = PropsWithChildren<
  Required<Pick<UseDisclosureProps, 'isOpen' | 'onClose'>>
>;

const BottomSheet = ({ isOpen, onClose, children }: Props) => {
  return (
    <Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay onClick={onClose} />
      <DrawerContent
        bgColor="white"
        borderTopRadius="1rem"
        margin="0 auto"
        style={{
          maxWidth: '43rem',
        }}
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default BottomSheet;
