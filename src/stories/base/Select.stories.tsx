import { Meta, StoryObj } from '@storybook/react';
import Select from '@/v1/base/Select';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/v1/base/Button';
import ErrorMessage from '@/v1/base/ErrorMessage';

const meta: Meta<typeof Select> = {
  title: 'Base/Select',
  component: Select,
  tags: ['autodocs'],
};

const numbers = [1, 2, 3] as const;

export default meta;

type DefaultValues = {
  requiredNumber: number;
  number: number;
};

const SelectWithUseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DefaultValues>({
    mode: 'all',
  });

  const handleSubmitForm: SubmitHandler<DefaultValues> = ({
    requiredNumber,
    number,
  }) => {
    alert(`requiredNumber: ${requiredNumber}, number: ${number}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex w-[43rem] flex-col gap-[1.6rem]"
    >
      <div className="flex flex-col gap-[0.5rem]">
        <Select
          placeholder="숫자를 선택해주세요. (필수)"
          {...register('requiredNumber', {
            required: '필수 항목입니다.',
          })}
          error={!!errors.requiredNumber}
        >
          {numbers.map(number => (
            <Select.Option key={number} value={number}>
              {number}
            </Select.Option>
          ))}
        </Select>
        {errors.requiredNumber && (
          <ErrorMessage>{errors.requiredNumber.message}</ErrorMessage>
        )}
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <Select
          placeholder="숫자를 선택해주세요."
          {...register('number')}
          error={!!errors.number}
        >
          {numbers.map(number => (
            <Select.Option key={number} value={number}>
              {number}
            </Select.Option>
          ))}
        </Select>
        {errors.number && <ErrorMessage>{errors.number.message}</ErrorMessage>}
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

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    placeholder: '선택해 주세요.',
  },
  render: args => (
    <Select {...args}>
      {numbers.map(number => (
        <Select.Option key={number} value={number}>
          {number}
        </Select.Option>
      ))}
    </Select>
  ),
};

export const Invalid: Story = {
  args: {
    placeholder: '입력해 주세요.',
    error: true,
  },
  render: args => (
    <div className="flex flex-col gap-[0.5rem]">
      <Select {...args} />
      <ErrorMessage>양식을 확인해주세요.</ErrorMessage>
    </div>
  ),
};

export const WithUseForm: Story = {
  render: () => (
    <div className="min-h-[20rem]">
      <SelectWithUseForm />
    </div>
  ),
};
