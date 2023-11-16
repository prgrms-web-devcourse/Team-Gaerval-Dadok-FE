import { Meta, StoryObj } from '@storybook/react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/ui/Base/Button';
import Input from '@/ui/Base/Input';
import InputLength from '@/ui/Base/InputLength';
import ErrorMessage from '@/ui/Base/ErrorMessage';

const meta: Meta<typeof InputLength> = {
  title: 'Base/InputLength',
  component: InputLength,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InputLength>;

type DefaultValues = {
  password: string;
};

const InputLengthUseWithForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<DefaultValues>({
    mode: 'all',
  });

  const handleSubmitForm: SubmitHandler<DefaultValues> = ({ password }) => {
    alert(`password: ${password}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex w-full flex-col gap-[1.6rem]"
    >
      <div className="flex flex-col gap-[0.5rem]">
        <Input
          placeholder="비밀번호를 입력해주세요."
          {...register('password', {
            required: '필수 항목입니다.',
            minLength: { value: 2, message: '2자 이상 입력해 주세요.' },
            maxLength: { value: 10, message: '10자 이하 입력해 주세요.' },
          })}
          error={!!errors.password}
        />
        <div className="flex flex-row-reverse justify-between gap-[0.4rem]">
          <InputLength
            currentLength={watch('password').length}
            isError={!!errors.password}
            maxLength={10}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
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
  render: () => <InputLengthUseWithForm />,
};
