import { Meta, StoryObj } from '@storybook/react';

import Button from '@/ui/Base/Button';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    theme: 'primary',
    label: '버튼',
  },
};

export const PrimaryLight: Story = {
  args: {
    theme: 'primary-light',
    label: '버튼',
  },
};

export const Warning: Story = {
  args: {
    theme: 'warning',
    label: '버튼',
  },
};

export const Light: Story = {
  args: {
    theme: 'light',
    label: '버튼',
  },
};

export const Kakao: Story = {
  args: {
    theme: 'kakao',
    label: '버튼',
  },
};

export const RecentSearch: Story = {
  args: {
    ...PrimaryLight.args,
    label: '최근 검색어',
    fontWeight: 'regular',
    fullRadius: true,
  },
};
