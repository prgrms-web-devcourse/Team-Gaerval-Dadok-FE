import { Meta, StoryObj } from '@storybook/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Switch from '@/v1/base/Switch';
import Button from '@/v1/base/Button';

const meta: Meta<typeof Switch> = {
  title: 'Base/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Switch>;

type FormValues = {
  comment: boolean;
};

const SwitchWithUseForm = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    mode: 'all',
    defaultValues: { comment: true },
  });

  const handleSubmitForm: SubmitHandler<FormValues> = ({ comment }) => {
    alert(`comment: ${comment ? 'public' : 'private'}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex w-[43rem] flex-col gap-[1.6rem]"
    >
      <div className="flex justify-between">
        <span className="text-md">댓글 공개</span>
        <Switch {...register('comment')} />
      </div>
      <Button
        size="large"
        type="submit"
        onClick={handleSubmit(handleSubmitForm)}
      >
        Submit
      </Button>
    </form>
  );
};

export const Default: Story = {
  args: { name: 'switch' },
};

export const WithForm: Story = {
  render: SwitchWithUseForm,
};
