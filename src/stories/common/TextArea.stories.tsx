import { Meta, StoryObj } from '@storybook/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextArea from '@/components/common/TextArea';
import Button from '@/components/common/Button';

const meta: Meta<typeof TextArea> = {
  title: 'Common/TextArea',
  component: TextArea,
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: { placeholder: '어떤 이야기를 모임에서 나누면 좋을까요?' },
};

type FormValue = {
  content: string;
};

const TextAreaWithForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({ mode: 'all' });

  const handleTextAreaSubmit: SubmitHandler<FormValue> = value => {
    alert(value.content);
  };

  return (
    <form onSubmit={handleSubmit(handleTextAreaSubmit)}>
      <TextArea
        {...register('content', {
          maxLength: { value: 3, message: '최대 3자' },
        })}
        count={true}
        error={!!errors.content}
      >
        <TextArea.Error>{errors.content?.message}</TextArea.Error>
      </TextArea>
      <Button type="submit" size="full">
        submit
      </Button>
    </form>
  );
};

export const UseWithForm: Story = {
  render: () => <TextAreaWithForm />,
};
