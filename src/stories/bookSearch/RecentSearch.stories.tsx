import { Meta, StoryObj } from '@storybook/react';
import RecentSearch from '@/components/bookSearch/RecentSearchList';

const meta: Meta<typeof RecentSearch> = {
  title: 'bookSearch/RecentSearch',
  component: RecentSearch,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RecentSearch>;

export const Default: Story = {
  args: {
    keywords: undefined,
    onClick: () => alert('선택한 검색어 검색!'),
  },
};

export const RecentSearches: Story = {
  args: {
    keywords: [
      { keyword: '21', modifiedAt: 'now' },
      { keyword: 'I Love It', modifiedAt: 'now' },
      { keyword: 'D (Half Moon)', modifiedAt: 'now' },
      { keyword: 'What 2 Do', modifiedAt: 'now' },
      { keyword: 'Bonnie & Clyde', modifiedAt: 'now' },
      { keyword: '풀어', modifiedAt: 'now' },
      { keyword: '어때', modifiedAt: 'now' },
    ],
    onClick: () => alert('선택한 검색어 검색!'),
  },
};
