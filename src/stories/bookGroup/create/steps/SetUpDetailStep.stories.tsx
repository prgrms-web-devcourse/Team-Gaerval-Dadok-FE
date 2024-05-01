import { appLayoutMeta } from '@/stories/meta';
import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import { getTodayDate } from '@/utils/date';

import {
  SetUpDetailStep,
  type SetUpDetailStepValues,
} from '@/v1/bookGroup/create/steps/SetUpDetailStep';

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
      book: {
        bookId: 23,
      },
      title: '',
      introduce: '',
      maxMemberCount: '',
      startDate: getTodayDate(),
      endDate: '',
      isPublic: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <SetUpDetailStep />
      </form>
    </FormProvider>
  );
};

export const Default: Story = {
  render: () => <SetUpDetailForm />,
};
