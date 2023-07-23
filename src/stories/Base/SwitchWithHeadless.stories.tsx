import { Meta, StoryObj } from '@storybook/react';
import SwitchWithHeadless from '@/ui/Base/SwitchWithHeadless';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/ui/Base/Button';

const meta: Meta<typeof SwitchWithHeadless> = {
  title: 'Base/SwitchWithHeadless',
  component: SwitchWithHeadless,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SwitchWithHeadless>;

type DefaultValues = {
  comment: boolean;
};

const SwitchWithUseForm = () => {
  const { register, handleSubmit } = useForm<DefaultValues>({
    mode: 'all',
    defaultValues: { comment: true },
  });

  const handleSubmitForm: SubmitHandler<DefaultValues> = ({ comment }) => {
    alert(`comment: ${comment ? 'public' : 'private'} `);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex w-[43rem] flex-col gap-[1.6rem]"
    >
      <SwitchWithHeadless {...register('comment')} />
      {/* <input type="checkbox" {...register('comment')} /> */}
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

export const WithForm: Story = {
  render: SwitchWithUseForm,
};
