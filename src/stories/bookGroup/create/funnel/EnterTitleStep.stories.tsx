import { Meta, StoryObj } from '@storybook/react';
import { appLayoutMeta } from '@/stories/meta';
import { FormProvider, useForm } from 'react-hook-form';

import {
  EnterTitleStep,
  type EnterTitleStepValues,
} from '@/v1/bookGroup/create/steps/EnterTitleStep';

const meta: Meta<typeof EnterTitleStep> = {
  title: 'bookGroup/create/steps/EnterTitleStep',
  component: EnterTitleStep,
  ...appLayoutMeta,
};

export default meta;

type Story = StoryObj<typeof EnterTitleStep>;

const EnterTitleForm = () => {
  const methods = useForm<EnterTitleStepValues>({
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
