import { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/common/Button';
import useToast from '@/components/common/Toast/useToast';
import ToastItem from '@/components/common/Toast/ToastItem';

const meta: Meta<typeof ToastItem> = {
  title: 'Common/Toast',
  component: ToastItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ToastItem>;

const WarningToast = () => {
  const toast = useToast();
  const handleButtonClick = () =>
    toast.show({
      type: 'warning',
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
  render: args => (
    <div className="flex flex-col gap-[1rem]">
      <ToastItem type="warning" {...args} />
      <ToastItem type="error" {...args} />
      <ToastItem type="success" {...args} />
    </div>
  ),
};

export const Normal: Story = {
  render: WarningToast,
};

export const Success: Story = {
  render: SuccessToast,
};

export const Error: Story = {
  render: ErrorToast,
};
