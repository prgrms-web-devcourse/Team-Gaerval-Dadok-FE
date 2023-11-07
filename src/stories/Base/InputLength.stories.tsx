import { Meta, StoryObj } from '@storybook/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/ui/Base/Button';
import ErrorMessage from '@/ui/Base/ErrorMessage';
import Input from '@/ui/Base/Input';
import InputLength from '@/ui/Base/InputLength';

const meta: Meta<typeof InputLength> = {
  title: 'Base/InputLength',
  component: InputLength,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputLength>;

type DefaultValues = {
  name: string;
  age: number;
};

const InputWithUseForm = () => {
  const {
    register,
    handleSubmit,
    control,
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
      <div className="flex flex-col gap-[0.5rem]">
        <Input
          placeholder="이름을 입력해주세요."
          {...register('name', {
            required: '필수 항목입니다.',
            minLength: { value: 2, message: '2자 이상 입력해 주세요.' },
            maxLength: { value: 10, message: '10자 이하 입력해 주세요.' },
          })}
          error={!!errors.name}
        />
        <div className="flex flex-row-reverse justify-between gap-[0.4rem]">
          <InputLength
            control={control}
            name={'name'}
            minLength={2}
            maxLength={10}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <Input
          placeholder="나이를 입력해 주세요."
          {...register('age', {
            pattern: { value: /^[0-9]+$/, message: '숫자만 입력 가능해요' },
            min: { value: 0, message: '0살부터 입력 가능해요.' },
          })}
          error={!!errors.age}
        />
        <InputLength
          control={control}
          name={'age'}
          minLength={1}
          maxLength={3}
        />
        {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
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
  render: () => <InputWithUseForm />,
};
