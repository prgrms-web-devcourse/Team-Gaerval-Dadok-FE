import Toast from '@/ui/Base/Toast/ToastProvider';
import { Meta, StoryObj } from '@storybook/react';

import Button from '@/ui/Base/Button';
import useToast from '@/ui/Base/Toast/useToast';

const meta: Meta<typeof Toast> = {
  title: 'Base/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Toast>;

const DefaultToast = () => {
  const toast = useToast();
  const handleButtonClick = () =>
    toast.show({ type: 'normal', message: '토스트 메세지' });

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
  render: () => <DefaultToast />,
};

export const Success: Story = {
  render: () => <SuccessToast />,
};

export const Error: Story = {
  render: () => <ErrorToast />,
};
