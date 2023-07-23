import { Meta, StoryObj } from '@storybook/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import SwitchWithController from '@/ui/Base/SwitchWithController';
import Button from '@/ui/Base/Button';

const meta: Meta<typeof SwitchWithController> = {
  title: 'Base/SwitchWithController',
  component: SwitchWithController,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SwitchWithController>;

type DefaultValues = {
  comment: boolean;
};

const SwitchWithUseForm = () => {
  const {
    register,
    handleSubmit,
    control: _control,
  } = useForm<DefaultValues>({
    mode: 'all',
    defaultValues: { comment: true },
  });

  const handleSubmitForm: SubmitHandler<DefaultValues> = ({ comment }) => {
    alert(`comment: ${comment ? 'public' : 'private'}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex w-[43rem] flex-col gap-[1.6rem]"
    >
      <SwitchWithController {...register('comment')} />
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
