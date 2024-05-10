import { forwardRef } from 'react';

import Button from '@/v1/base/Button';
import Drawer from '@/v1/base/Drawer';

interface CommentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  defaultComment?: string;
  placeholder?: string;
}

const CommentDrawer = forwardRef<HTMLTextAreaElement, CommentDrawerProps>(
  ({ isOpen, onClose, onConfirm, title, defaultComment, placeholder }, ref) => {
    const handleConfirm = () => {
      onConfirm && onConfirm();
      onClose();
    };

    return (
      <Drawer isOpen={isOpen} onClose={onClose}>
        <Drawer.Header>
          <Drawer.CloseButton position="top-left" />
          <Drawer.Title text={title} />
          <Button
            colorScheme="main"
            fill={false}
            size="medium"
            className="flex-shrink-0 border-none !p-0 disabled:cursor-default disabled:text-placeholder"
            onClick={handleConfirm}
          >
            완료
          </Button>
        </Drawer.Header>
        <Drawer.Content>
          <textarea
            className="w-full resize-none border-none text-md focus:outline-none"
            rows={15}
            defaultValue={defaultComment}
            placeholder={placeholder}
            ref={ref}
          />
        </Drawer.Content>
      </Drawer>
    );
  }
);

CommentDrawer.displayName = 'CommentDrawer';

export default CommentDrawer;
