import { Meta, StoryObj } from '@storybook/react';
import BestSellers from '@/v1/bookSearch/BestSellers';

const meta: Meta<typeof BestSellers> = {
  title: 'bookSearch/BestSellers',
  component: BestSellers,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BestSellers>;

type BestSellerProps = {
  isbn: string;
  title: string;
  author: string;
  cover: string;
  bestRank: number;
  link: string;
};

const BESTSELLER: BestSellerProps = {
  isbn: '9791162242742',
  title: '리팩터링',
  author: '마틴 파울러',
  cover:
    'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5326912%3Ftimestamp%3D20231207165435',
  bestRank: 1,
  link: 'https://search.daum.net/search?w=bookpage&bookId=5326912&q=%EB%A6%AC%ED%8C%A9%ED%84%B0%EB%A7%81',
};

export const Default: Story = {
  args: {
    bestSellers: [BESTSELLER, BESTSELLER, BESTSELLER],
    searchRange: 'WEEKLY',
  },
};

export const MonthlyBestSeller: Story = {
  args: {
    bestSellers: [],
    searchRange: 'MONTHLY',
  },
};

export const YearlyBestSeller: Story = {
  args: {
    bestSellers: [],
    searchRange: 'YEARLY',
  },
};
