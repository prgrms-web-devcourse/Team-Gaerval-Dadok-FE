import { Meta, StoryObj } from '@storybook/react';
import Modal from '@/ui/Base/Modal';
import useDisclosure from '@/hooks/useDisclosure';
import Button from '@/ui/Base/Button';
import { Fragment } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Base/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Modal>;

const BaseModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <Button
        onClick={() => {
          onOpen();
        }}
      >
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}></Modal>
    </Fragment>
  );
};

const DeleteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    alert('삭제되었습니다.');
    onClose();
  };

  return (
    <Fragment>
      <Button
        onClick={() => {
          onOpen();
        }}
      >
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="text-lg font-bold">
          정말 삭제할까요?
          <p className="text-xs font-normal text-black-500">
            한번 삭제하면 되돌릴 수 없어요.
          </p>
        </div>
        <div className="flex justify-end gap-[10px]">
          <Button
            onClick={onClose}
            fill={false}
            colorScheme="grey"
            size="small"
          >
            취소
          </Button>
          <Button onClick={handleClick} size="small">
            확인
          </Button>
        </div>
      </Modal>
    </Fragment>
  );
};

export const Default: Story = {
  render: () => <BaseModal />,
};

export const Delete: Story = {
  render: () => <DeleteModal />,
};
