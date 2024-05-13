import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import type { EnterTitleStepFormValues } from '@/v1/bookGroup/create/types';

import { appLayoutMeta } from '@/stories/meta';
import { EnterTitleStep } from '@/v1/bookGroup/create/steps';

const meta: Meta<typeof EnterTitleStep> = {
  title: 'bookGroup/create/steps/EnterTitleStep',
  component: EnterTitleStep,
  ...appLayoutMeta,
};

export default meta;

type Story = StoryObj<typeof EnterTitleStep>;

const EnterTitleForm = () => {
  const methods = useForm<EnterTitleStepFormValues>({
    mode: 'all',
    defaultValues: {
      title: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form>
        <EnterTitleStep />
      </form>
    </FormProvider>
  );
};

export const Default: Story = {
  render: () => <EnterTitleForm />,
};
