import { getTodayDate } from '@/utils/date';
import Button from '@/v1/base/Button';
import DatePicker from '@/v1/base/DatePicker';
import ErrorMessage from '@/v1/base/ErrorMessage';
import { Meta, StoryObj } from '@storybook/react';
import { SubmitHandler, useForm } from 'react-hook-form';

const meta: Meta<typeof DatePicker> = {
  title: 'Base/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    defaultValue: '2023-06-16',
  },
  render: args => <DatePicker {...args} />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '2023-06-16',
  },
  render: args => <DatePicker {...args} />,
};

export const UseWithForm: Story = {
  render: () => <DatePickerWithForm />,
};

type DefaultValues = {
  startDate: string;
  endDate: string;
  hello: number;
  hi: string;
};

const DatePickerWithForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DefaultValues>({
    mode: 'all',
    defaultValues: {
      startDate: getTodayDate(),
      endDate: '2030-12-25',
    },
  });

  const handleSubmitForm: SubmitHandler<DefaultValues> = ({
    startDate,
    endDate,
  }) => {
    alert(`startDate: ${startDate} endDate: ${endDate}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex flex-col gap-[3.2rem]"
    >
      <div className="flex flex-col gap-[0.5rem]">
        <DatePicker
          disabled={true}
          min={getTodayDate()}
          {...register('startDate', {
            required: { value: true, message: '종료일을 입력해주세요' },
            min: {
              value: getTodayDate(),
              message: '종료일은 시작일보다 늦어야 해요',
            },
          })}
        />
        {errors.startDate && (
          <ErrorMessage>{errors.startDate.message}</ErrorMessage>
        )}
      </div>
      <div className="flex flex-col gap-[0.5rem]">
        <DatePicker
          min={getTodayDate()}
          {...register('endDate', {
            required: { value: true, message: '종료일을 입력해주세요.' },
            min: {
              value: getTodayDate(),
              message: '종료일은 시작일보다 늦어야 해요.',
            },
          })}
        />
        {errors.endDate && (
          <ErrorMessage>{errors.endDate.message}</ErrorMessage>
        )}
      </div>
      <Button
        size="full"
        type="submit"
        onClick={handleSubmit(handleSubmitForm)}
      >
        Submit
      </Button>
    </form>
  );
};
