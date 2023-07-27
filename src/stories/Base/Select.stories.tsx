import { Meta, StoryObj } from '@storybook/react';
import Select from '@/ui/Base/Select';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/ui/Base/Button';

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
      <Select
        placeholder="숫자를 선택해주세요. (필수)"
        {...register('requiredNumber', {
          required: '필수 항목입니다.',
        })}
        errorMessage={errors.requiredNumber?.message}
      >
        {numbers.map(number => (
          <Select.Option key={number} value={number}>
            {number}
          </Select.Option>
        ))}
      </Select>
      <Select
        placeholder="숫자를 선택해주세요."
        {...register('number')}
        errorMessage={errors.number?.message}
      >
        {numbers.map(number => (
          <Select.Option key={number} value={number}>
            {number}
          </Select.Option>
        ))}
      </Select>
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
    placeholder: '선택해 주세요.',
    errorMessage: '에러 메시지에요.',
  },
};

export const WithUseForm: Story = {
  render: () => (
    <div className="min-h-[20rem]">
      <SelectWithUseForm />
    </div>
  ),
};
