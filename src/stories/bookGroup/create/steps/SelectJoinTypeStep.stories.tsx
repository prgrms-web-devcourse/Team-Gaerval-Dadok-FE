import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import type { SelectJoinTypeStepFormValues } from '@/components/bookGroup/create/types';

import { appLayoutMeta } from '@/stories/meta';
import { SelectJoinTypeStep } from '@/components/bookGroup/create/steps';

const meta: Meta<typeof SelectJoinTypeStep> = {
  title: 'bookGroup/create/steps/SelectJoinTypeStep',
  component: SelectJoinTypeStep,
  ...appLayoutMeta,
};

export default meta;

type Story = StoryObj<typeof SelectJoinTypeStep>;

const RenderSelectJoinTypeStep = () => {
  const methods = useForm<SelectJoinTypeStepFormValues>({
    defaultValues: {
      hasJoinPassword: 'false',
    },
    mode: 'all',
  });

  const onSubmit = () => {
    const { hasJoinPassword, joinPassword, joinQuestion } = methods.getValues();
    alert(
      `가입 문제 유무: ${hasJoinPassword}\n가입 문제: ${joinQuestion}\n정답: ${joinPassword}`
    );
  };

  return (
    <FormProvider {...methods}>
      <form>
        <SelectJoinTypeStep onSubmit={onSubmit} />
      </form>
    </FormProvider>
  );
};

export const Default: Story = {
  render: () => <RenderSelectJoinTypeStep />,
};
