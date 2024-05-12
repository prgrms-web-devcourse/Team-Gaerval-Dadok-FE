import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import type { SetUpDetailStepValues } from '@/v1/bookGroup/create/types';

import { getTodayDate } from '@/utils/date';

import { appLayoutMeta } from '@/stories/meta';
import { SetUpDetailStep } from '@/v1/bookGroup/create/steps';

const meta: Meta<typeof SetUpDetailStep> = {
  title: 'bookGroup/create/steps/SetUpDetailStep',
  component: SetUpDetailStep,
  ...appLayoutMeta,
};

export default meta;

type Story = StoryObj<typeof SetUpDetailStep>;

const SetUpDetailForm = () => {
  const methods = useForm<SetUpDetailStepValues>({
    mode: 'all',
    defaultValues: {
      title: '',
      book: {
        bookId: 23,
      },
      startDate: getTodayDate(),
    },
  });

  const onNextStep = () => {
    const {
      book,
      title,
      introduce,
      maxMemberCount,
      customMemberCount,
      startDate,
      endDate,
      isPublic,
    } = methods.getValues();
    alert(`
      bookId: ${book.bookId},
      title: ${title},
      introduce: ${introduce},
      maxMemberCount: ${maxMemberCount},
      customMemberCount: ${customMemberCount},
      startDate: ${startDate},
      endDate: ${endDate},
      isPublic: ${isPublic}`);
  };

  return (
    <FormProvider {...methods}>
      <form>
        <SetUpDetailStep
          goToSelectBookStep={() => alert('goToSelectBookStep')}
          onNextStep={onNextStep}
        />
      </form>
    </FormProvider>
  );
};

export const Default: Story = {
  render: () => <SetUpDetailForm />,
};
