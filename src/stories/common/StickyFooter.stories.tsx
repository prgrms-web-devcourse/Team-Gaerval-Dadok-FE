import Button from '@/components/common/Button';
import StickyFooter from '@/components/common/StickyFooter';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StickyFooter> = {
  title: 'Common/StickyFooter',
  component: StickyFooter,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof StickyFooter>;

export const Default: Story = {
  args: {},
  render: () => (
    <StickyFooter>
      <Button size="full" onClick={() => alert('click!')}>
        다음
      </Button>
    </StickyFooter>
  ),
};

export const Row: Story = {
  args: { direction: 'row' },
  render: args => (
    <StickyFooter {...args}>
      <Button size="full">1</Button>
      <Button size="full" colorScheme="grey">
        2
      </Button>
    </StickyFooter>
  ),
};

export const Column: Story = {
  args: { direction: 'column' },
  render: args => (
    <StickyFooter {...args}>
      <Button size="full">1</Button>
      <Button size="full" colorScheme="grey">
        2
      </Button>
    </StickyFooter>
  ),
};
