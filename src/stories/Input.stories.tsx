import { Meta, StoryObj } from '@storybook/react';
import Input from '@/ui/Base/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './Button';

const meta: Meta<typeof Input> = {
  title: 'Base/Input',
  component: Input,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Input>;

type DefaultValues = {
  name: string;
  age: number;
};

const InputWithUseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DefaultValues>({
    mode: 'all',
  });

  const handleSubmitForm: SubmitHandler<DefaultValues> = ({ name, age }) => {
    alert(`name: ${name}, age: ${age}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex w-[43rem] flex-col gap-[1.6rem]"
    >
      <Input
        placeholder="이름을 입력해주세요."
        {...register('name', {
          required: '필수 항목입니다.',
          minLength: { value: 2, message: '2자 이상 입력해 주세요.' },
          maxLength: { value: 10, message: '10자 이하 입력해 주세요.' },
        })}
        error={errors.name}
      />
      <Input
        placeholder="나이를 입력해 주세요."
        {...register('age', {
          pattern: { value: /^[0-9]+$/, message: '숫자만 입력 가능해요' },
          min: { value: 0, message: '0살부터 입력 가능해요.' },
        })}
        error={errors.age}
      />
      <Button
        primary
        size="sm"
        label="Submit"
        onClick={handleSubmit(handleSubmitForm)}
      />
    </form>
  );
};
export const Primary: Story = {
  args: {
    placeholder: '',
  },
};

export const UseForm: Story = {
  render: () => <InputWithUseForm />,
};
