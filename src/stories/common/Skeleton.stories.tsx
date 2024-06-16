import { Meta, StoryObj } from '@storybook/react';
import Skeleton from '@/components/common/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Common/Skeleton',
  component: Skeleton,
};

export default meta;

type CircleStory = StoryObj<typeof Skeleton.Circle>;
type TextStory = StoryObj<typeof Skeleton.Text>;
type RectStory = StoryObj<typeof Skeleton.Rect>;

const basicSizes = ['small', 'medium', 'large'];

export const Circle: CircleStory = {
  args: { size: 'small' },
  argTypes: {
    size: {
      options: [...basicSizes],
      control: { type: 'radio' },
    },
  },
  render: args => (
    <Skeleton>
      <Skeleton.Circle {...args} />
    </Skeleton>
  ),
};

export const Text: TextStory = {
  args: { fontSize: 'small', width: '50%' },
  argTypes: {
    fontSize: {
      options: ['2xsmall', 'xsmall', ...basicSizes, 'xlarge', '2xlarge'],
      control: { type: 'radio' },
    },
  },
  render: args => (
    <Skeleton>
      <Skeleton.Text {...args} />
    </Skeleton>
  ),
};

export const Rectangle: RectStory = {
  args: { width: '10rem', height: '12.3rem' },
  argTypes: {
    rounded: {
      options: [...basicSizes, 'full'],
      control: { type: 'radio' },
    },
  },
  render: args => (
    <Skeleton>
      <Skeleton.Rect {...args} />
    </Skeleton>
  ),
};
