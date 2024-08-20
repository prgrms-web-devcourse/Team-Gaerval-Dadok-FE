import { Meta, StoryObj } from '@storybook/react';

import Button from '@/v1/base/Button';
import useToast from '@/v1/base/Toast/useToast';
import ToastItem from '@/v1/base/Toast/ToastItem';

const meta: Meta<typeof ToastItem> = {
  title: 'Base/Toast',
  component: ToastItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ToastItem>;

const NormalToast = () => {
  const toast = useToast();
  const handleButtonClick = () =>
    toast.show({
      type: 'normal',
      message: '5초 동안 보여지는 토스트 메세지에요.',
      duration: 5000,
    });

  return <Button onClick={handleButtonClick}>토스트 띄우기</Button>;
};

const SuccessToast = () => {
  const toast = useToast();
  const handleButtonClick = () =>
    toast.show({ type: 'success', message: '링크가 복사되었어요' });

  return <Button onClick={handleButtonClick}>링크 복사하기</Button>;
};

const ErrorToast = () => {
  const toast = useToast();
  const handleButtonClick = () =>
    toast.show({ type: 'error', message: '잠시 후 다시 시도해주세요' });

  return <Button onClick={handleButtonClick}>재시도</Button>;
};

export const Default: Story = {
  args: {
    message: '토스트 예시',
  },
  render: args => <ToastItem {...args} />,
};

export const Normal: Story = {
  render: NormalToast,
};

export const Success: Story = {
  render: SuccessToast,
};

export const Error: Story = {
  render: ErrorToast,
};
