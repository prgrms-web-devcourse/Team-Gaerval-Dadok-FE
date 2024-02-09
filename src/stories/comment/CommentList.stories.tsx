import { Meta, StoryObj } from '@storybook/react';
import CommentList from '@/v1/comment/CommentList';

const meta: Meta<typeof CommentList> = {
  title: 'comment/CommentList',
  component: CommentList,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CommentList>;

const comments = [
  {
    id: 1,
    writer: {
      id: 2,
      profileImageSrc: 'https://bit.ly/kent-c-dodds',
      name: 'Kent C. Dodds',
    },
    createdAt: '2023.02.05',
    content: '추천해요!',
  },
  {
    id: 2,
    writer: {
      id: 3,
      profileImageSrc: 'https://i.pravatar.cc/300',
      name: '김계란',
    },
    createdAt: '2023.02.07',
    content: '읽고 또 읽어도 새로워요. 🫠',
  },
];

export const Default: Story = {
  args: {
    comments,
    isEditableComment: ({ writer }) => writer.id === 3,
  },
};

export const Hidden: Story = {
  args: {
    comments,
    hidden: true,
    hiddenText: '멤버만 볼 수 있어요 🥲',
  },
};

export const Empty: Story = {
  args: {
    comments: [],
    emptyText: `아직 코멘트가 없어요.
                첫 코멘트의 주인공이 되어보세요!`,
  },
};
