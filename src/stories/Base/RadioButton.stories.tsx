import { Meta, StoryObj } from '@storybook/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import RadioButton from '@/ui/Base/RadioButton';
import Button from '@/ui/Base/Button';

const meta: Meta<typeof RadioButton> = {
  title: 'Base/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

type FormValues = {
  Radio: string;
};

const RadioButtonWithUseForm = () => {
  const { register, handleSubmit, watch } = useForm<FormValues>({
    mode: 'all',
    defaultValues: { Radio: '라디오 A' },
  });

  const handleSubmitForm: SubmitHandler<FormValues> = ({ Radio }) => {
    alert(`Submit as: ${Radio}`);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex w-[43rem] flex-col gap-[1.6rem]"
      >
        <div className="flex justify-between">
          <RadioButton {...register('Radio')} value="라디오 A" />
          <RadioButton {...register('Radio')} value="라디오 B" />
          <RadioButton {...register('Radio')} value="라디오 C" />
        </div>
        <Button size="large" type="submit">
          Submit
        </Button>
      </form>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
    </>
  );
};

export const Default: Story = {
  render: args => <RadioButton {...args} value="라디오 버튼" />,
};

export const RadioButtonForm: Story = {
  render: RadioButtonWithUseForm,
};
