import { FormProvider, useForm } from 'react-hook-form';
import type { APICreateGroup } from '@/types/group';
import { getTodayDate } from '@/utils/date';

import { SetUpDetailStep } from '@/v1/bookGroup/create/funnel';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SetUpDetailStep> = {
  title: 'bookGroup/funnel/SetUpDetailStep',
  component: SetUpDetailStep,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SetUpDetailStep>;
interface FunnelFormValues extends APICreateGroup {
  customMemberCount: string | number;
}

const SetUpDetailForm = () => {
  const methods = useForm<FunnelFormValues>({
    mode: 'all',
    defaultValues: {
      bookId: 23,
      title: '',
      introduce: '',
      maxMemberCount: 9999,
      startDate: getTodayDate(),
      endDate: '',
      isPublic: false,
      hasJoinPasswd: false,
      joinQuestion: '',
      joinPasswd: '',
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
