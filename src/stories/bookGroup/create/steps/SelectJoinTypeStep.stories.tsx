import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { appLayoutMeta } from '@/stories/meta';

import {
  SelectJoinTypeStep,
  SelectJoinFormValue,
} from '@/v1/bookGroup/create/steps/SelectJoinTypeStep';

const meta: Meta<typeof SelectJoinTypeStep> = {
  title: 'bookGroup/create/steps/SelectJoinTypeStep',
  component: SelectJoinTypeStep,
  ...appLayoutMeta,
};

export default meta;

type Story = StoryObj<typeof SelectJoinTypeStep>;

const RenderSelectBookStep = () => {
  const methods = useForm<SelectJoinFormValue>({
    defaultValues: {
      hasJoinPasswd: 'false',
    },
    mode: 'all',
  });

  const onSubmit = () => {
    const { hasJoinPasswd, joinPasswd, joinQuestion } = methods.getValues();
    alert(
      `가입 문제 유무: ${hasJoinPasswd}\n가입 문제: ${joinQuestion}\n정답: ${joinPasswd}`
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
  render: () => <RenderSelectBookStep />,
};
