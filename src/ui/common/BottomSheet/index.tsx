import { PropsWithChildren } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  UseDisclosureProps,
} from '@chakra-ui/react';

type Props = PropsWithChildren<
  Required<Pick<UseDisclosureProps, 'isOpen' | 'onClose'>>
> & {
  onCancel?: () => void;
};

const BottomSheet = ({ isOpen, onClose, onCancel, children }: Props) => {
  const handleDrawerCancel = () => {
    console.log('onCancel');
    onCancel && onCancel();
    onClose();
  };

  return (
    <Drawer
      placement="bottom"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={handleDrawerCancel}
    >
      <DrawerOverlay />
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
