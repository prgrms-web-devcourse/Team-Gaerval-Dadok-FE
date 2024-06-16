'use client';

import { forwardRef, useEffect } from 'react';

import Button from '@/components/common/Button';
import Drawer from '@/components/common/Drawer';

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

    useEffect(() => {
      if (!isOpen) return;

      // Drawer가 열릴 때 textarea의 끝에 focus
      setTimeout(() => {
        const textarea = document.querySelector('textarea');

        if (textarea) {
          textarea.focus();
          textarea.select();
          window.getSelection()?.collapseToEnd();
        }
      }, 100);
    }, [isOpen]);

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
            className="w-full resize-none border-none font-body1-regular focus:outline-none"
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
