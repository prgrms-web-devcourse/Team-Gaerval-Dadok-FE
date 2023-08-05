import { Meta, StoryObj } from '@storybook/react';
import Input from '@/ui/Base/Input';
import Button from '@/ui/Base/Button';
import { Control, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import ErrorMessage from '@/ui/Base/ErrorMessage';

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
          <Length control={control} minLength={2} maxLength={10} />
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

const Length = ({
  control,
  minLength,
  maxLength,
}: {
  control: Control<DefaultValues>;
  minLength: number;
  maxLength: number;
}) => {
  const nickname = useWatch({
    control,
    name: 'name',
  });

  const currentLength = nickname ? nickname.length : 0;
  const isError = minLength > currentLength || currentLength > maxLength;
  const textColor = isError ? 'text-warning-800 ' : 'text-main-900';

  return (
    <div>
      <span className={textColor}>{currentLength}</span>/
      {maxLength}
    </div>
  );
};

export const Default: Story = {
  args: {
    placeholder: '입력해 주세요.',
  },
};

export const Invalid: Story = {
  args: {
    placeholder: '입력해 주세요.',
    error: true,
  },
  render: args => (
    <div className="flex flex-col gap-[0.5rem]">
      <Input {...args} />
      <ErrorMessage>양식을 확인해주세요.</ErrorMessage>
    </div>
  ),
};

export const WithUseForm: Story = {
  render: () => <InputWithUseForm />,
};
