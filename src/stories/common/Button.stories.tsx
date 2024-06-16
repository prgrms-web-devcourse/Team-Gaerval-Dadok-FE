import { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/common/Button';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    colorScheme: { control: 'select' },
  },
  args: {
    size: 'medium',
    fill: true,
    fullRadius: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: args => <Button {...args}>버튼</Button>,
};

export const Main: Story = {
  args: {
    colorScheme: 'main',
  },
  render: args => <Button {...args}>버튼</Button>,
};

export const MainLight: Story = {
  args: {
    colorScheme: 'main-light',
  },
  render: args => <Button {...args}>버튼</Button>,
};

export const Warning: Story = {
  args: {
    colorScheme: 'warning',
  },
  render: args => <Button {...args}>버튼</Button>,
};

export const Grey: Story = {
  args: {
    colorScheme: 'grey',
  },
  render: args => <Button {...args}>버튼</Button>,
};

export const Kakao: Story = {
  args: {
    colorScheme: 'kakao',
  },
  render: args => <Button {...args}>버튼</Button>,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => (
    <div className="flex gap-[0.5rem]">
      <Button {...args} fill={true}>
        버튼
      </Button>
      <Button {...args} fill={false}>
        버튼
      </Button>
    </div>
  ),
};

export const RecentSearch: Story = {
  args: {
    ...MainLight.args,
    fullRadius: true,
  },
  render: args => <Button {...args}>최근 검색어</Button>,
};
