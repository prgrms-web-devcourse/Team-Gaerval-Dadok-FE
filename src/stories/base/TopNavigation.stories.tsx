import { Meta, StoryObj } from '@storybook/react';
import TopNavigation from '@/v1/base/TopNavigation';
import {
  IconPost,
  IconShare,
  IconArrowLeft,
  IconHamburger,
  IconClose,
} from '@public/icons';

const meta: Meta<typeof TopNavigation> = {
  title: 'Base/TopNavigation',
  component: TopNavigation,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TopNavigation>;

export const Default: Story = {
  render: () => (
    <TopNavigation>
      <TopNavigation.LeftItem>
        <IconArrowLeft />
      </TopNavigation.LeftItem>
      <TopNavigation.CenterItem>
        Refactoring 2nd(리팩터링 2판)
      </TopNavigation.CenterItem>
      <TopNavigation.RightItem>
        <IconShare />
      </TopNavigation.RightItem>
    </TopNavigation>
  ),
};

export const OnlySide: Story = {
  render: () => (
    <TopNavigation>
      <TopNavigation.LeftItem>
        <IconArrowLeft />
      </TopNavigation.LeftItem>
      <TopNavigation.RightItem>
        <IconShare />
      </TopNavigation.RightItem>
    </TopNavigation>
  ),
};

export const OnlyCenter: Story = {
  render: () => (
    <TopNavigation>
      <TopNavigation.CenterItem textAlign="left">
        Refactoring 2nd(리팩터링 2판)
      </TopNavigation.CenterItem>
    </TopNavigation>
  ),
};

export const CenterWithLeft: Story = {
  render: () => (
    <TopNavigation>
      <TopNavigation.LeftItem>
        <IconArrowLeft />
      </TopNavigation.LeftItem>
      <TopNavigation.CenterItem textAlign="left">
        Refactoring 2nd(리팩터링 2판)
      </TopNavigation.CenterItem>
    </TopNavigation>
  ),
};

export const CenterWithRight: Story = {
  render: () => (
    <TopNavigation>
      <TopNavigation.CenterItem>
        Refactoring 2nd(리팩터링 2판)
      </TopNavigation.CenterItem>
      <TopNavigation.RightItem>
        <IconShare />
      </TopNavigation.RightItem>
    </TopNavigation>
  ),
};

export const TextLeft: Story = {
  render: () => (
    <TopNavigation>
      <TopNavigation.LeftItem>
        <IconArrowLeft />
      </TopNavigation.LeftItem>
      <TopNavigation.CenterItem textAlign="left">
        프롱이 리팩터링 스터디
      </TopNavigation.CenterItem>
      <TopNavigation.RightItem>
        <IconPost />
        <IconHamburger />
      </TopNavigation.RightItem>
    </TopNavigation>
  ),
};

export const PostWrite: Story = {
  render: () => (
    <TopNavigation>
      <TopNavigation.LeftItem>
        <IconClose />
      </TopNavigation.LeftItem>
      <TopNavigation.CenterItem>글 작성하기</TopNavigation.CenterItem>
      <TopNavigation.RightItem>
        <button className="font-bold text-main-900">완료</button>
      </TopNavigation.RightItem>
    </TopNavigation>
  ),
};
