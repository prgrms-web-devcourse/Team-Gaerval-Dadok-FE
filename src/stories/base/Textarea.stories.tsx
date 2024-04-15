import { Meta, StoryObj } from '@storybook/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import CountTextarea, { Textarea } from '@/v1/base/Textarea';
import Button from '@/v1/base/Button';

const meta: Meta<typeof CountTextarea> = {
  title: 'Base/CountTextarea',
  component: CountTextarea,
};

export default meta;

type Story = StoryObj<typeof CountTextarea>;

export const Default: Story = {
  args: { placeholder: '어떤 이야기를 모임에서 나누면 좋을까요?' },
};

export const OnlyTextarea: Story = {
  render: () => <Textarea />,
};

type FormValue = {
  content: string;
};

const TextareaWithForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ mode: 'all' });

  const handleTextareaSubmit: SubmitHandler<FormValue> = value => {
    alert(value.content);
  };

  return (
    <form onSubmit={handleSubmit(handleTextareaSubmit)}>
      <CountTextarea
        error={!!errors.content}
        errorMessage={errors.content?.message}
        {...register('content', {
          maxLength: { value: 3, message: '최대 3자' },
        })}
      />

      {/* <Textarea
        {...register('content', {
          maxLength: { value: 3, message: '300자 최대' },
        })}
      >
        <Textarea.Error   />
      </Textarea> */}

      <Button type="submit" size="full">
        submit
      </Button>
    </form>
  );
};

export const UseWithForm: Story = {
  render: () => <TextareaWithForm />,
};
