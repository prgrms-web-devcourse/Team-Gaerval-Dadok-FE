import { Meta, StoryObj } from '@storybook/react';
import Modal from '@/ui/Base/Modal';
import { useState } from 'react';
import Button from '@/ui/Base/Button';

const meta: Meta<typeof Modal> = {
  title: 'Base/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal>;

const DeleteMeetingModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const deleteHandler = () => {
    alert('삭제 되었습니다.');
  };

  return (
    <div>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Modal
      </Button>
      <Modal
        title="모임"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        deleteHandler={deleteHandler}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <DeleteMeetingModal />,
};
