import { Meta, StoryObj } from '@storybook/react';

import useDisclosure from '@/hooks/useDisclosure';

import Button from '@/v1/base/Button';
import Drawer from '@/v1/base/Drawer';

const meta: Meta<typeof Drawer> = {
  title: 'Base/Drawer',
  component: Drawer,
};

export default meta;

type Story = StoryObj<typeof Drawer>;

const BaseDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Drawer 열기</Button>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <Drawer.Header>
          <Drawer.CloseButton position="top-right" />
          <Drawer.Title text="Drawer Header" />
        </Drawer.Header>
        <Drawer.Content>
          <p>Drawer Content</p>
        </Drawer.Content>
      </Drawer>
    </>
  );
};

const AddCommentDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>모임 글 작성하기</Button>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <Drawer.Header>
          <Drawer.CloseButton position="top-left" />
          <Drawer.Title text="모임 게시글 작성하기" />
          <Button
            colorScheme="main"
            fill={false}
            size="medium"
            className="flex-shrink-0 border-none !p-0"
            onClick={onClose}
          >
            완료
          </Button>
        </Drawer.Header>
        <Drawer.Content>
          <textarea
            className="h-[60vh] w-full resize-none border-none text-md focus:outline-none"
            placeholder="책에 대한 여러분의 자유로운 생각을 들려주세요"
          />
        </Drawer.Content>
      </Drawer>
    </>
  );
};

export const Default: Story = {
  render: BaseDrawer,
};

export const AddComment: Story = {
  render: AddCommentDrawer,
};
