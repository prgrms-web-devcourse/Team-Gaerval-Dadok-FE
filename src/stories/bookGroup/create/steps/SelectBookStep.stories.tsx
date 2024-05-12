import { Meta, StoryObj } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';

import { appLayoutMeta } from '@/stories/meta';
import SelectBookStep, {
  SelectBookFormValue,
} from '@/v1/bookGroup/create/steps/SelectBookStep/SelectBookStep';

const meta: Meta<typeof SelectBookStep> = {
  title: 'bookGroup/create/steps/SelectBookStep',
  component: SelectBookStep,
  ...appLayoutMeta,
};

export default meta;

type Story = StoryObj<typeof SelectBookStep>;

const RenderSelectBookStep = () => {
  const methods = useForm<SelectBookFormValue>();

  const goNextStep = () => {
    const book = methods.getValues('book');
    alert([`title: ${book.title}`, `id: ${book.bookId}`].join('\n'));
  };

  return (
    <FormProvider {...methods}>
      <form>
        <SelectBookStep onNextStep={goNextStep} />
      </form>
    </FormProvider>
  );
};

export const Default: Story = {
  render: RenderSelectBookStep,
};
