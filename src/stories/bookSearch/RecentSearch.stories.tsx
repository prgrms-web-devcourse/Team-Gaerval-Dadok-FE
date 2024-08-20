import { Meta, StoryObj } from '@storybook/react';
import RecentSearch from '@/v1/bookSearch/RecentSearch';

const meta: Meta<typeof RecentSearch> = {
  title: 'bookSearch/RecentSearch',
  component: RecentSearch,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof RecentSearch>;

export const Default: Story = {
  args: {
    recentSearches: undefined,
    setInputSearchValue: () => alert('선택한 검색어 검색!'),
  },
};

export const RecentSearches: Story = {
  args: {
    recentSearches: [
      { keyword: '21', modifiedAt: 'now' },
      { keyword: 'I Love It', modifiedAt: 'now' },
      { keyword: 'D (Half Moon)', modifiedAt: 'now' },
      { keyword: 'What 2 Do', modifiedAt: 'now' },
      { keyword: 'Bonnie & Clyde', modifiedAt: 'now' },
      { keyword: '풀어', modifiedAt: 'now' },
      { keyword: '어때', modifiedAt: 'now' },
    ],
    setInputSearchValue: () => alert('선택한 검색어 검색!'),
  },
};
