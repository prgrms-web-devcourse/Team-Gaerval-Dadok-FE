import EditMyProfile from '@/v1/profile/EditMyProfile';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof EditMyProfile> = {
  title: 'profile/EditMyProfile',
  component: EditMyProfile,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EditMyProfile>;

export const Default: Story = {
  args: {
    profile: {
      nickname: '벨로퍼어트',
      job: {
        jobGroupName: 'DEVELOPMENT',
        jobName: 'FRONTEND_DEVELOPER',
        jobGroupKoreanName: '개발',
        jobNameKoreanName: '프론트엔드 개발',
        order: 1,
      },
    },
    jobGroups: [
      {
        koreanName: '개발',
        name: 'DEVELOPMENT',
        jobs: [
          {
            koreanName: '백엔드 개발자',
            name: 'BACKEND_DEVELOPER',
            order: 1,
          },
          {
            koreanName: '프론트엔드 개발자',
            name: 'FRONTEND_DEVELOPER',
            order: 2,
          },
        ],
      },
    ],
  },
  render: args => <EditMyProfile {...args} />,
};
