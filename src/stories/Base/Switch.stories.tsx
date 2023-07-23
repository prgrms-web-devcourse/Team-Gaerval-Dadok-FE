import { Meta, StoryObj } from '@storybook/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Switch from '@/ui/Base/Switch';
import Button from '@/ui/Base/Button';

const meta: Meta<typeof Switch> = {
  title: 'Base/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Switch>;

type DefaultValues = {
  comment: string;
};

const SwitchWithUseForm = () => {
  const { register, handleSubmit } = useForm<DefaultValues>({
    mode: 'all',
    defaultValues: { comment: 'true' },
  });

  const handleSubmitForm: SubmitHandler<DefaultValues> = ({ comment }) => {
    alert(`comment: ${comment ? 'public' : 'private'}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex w-[43rem] flex-col gap-[1.6rem]"
    >
      <Switch {...register('comment')} />
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
  args: { name: 'toggle' },
};

export const WithForm: Story = {
  render: SwitchWithUseForm,
};
