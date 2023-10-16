import { Meta, StoryObj } from '@storybook/react';
import SearchGroup from '@/ui/Base/bookgroup/SearchGroup';

const meta: Meta<typeof SearchGroup> = {
  title: 'Base/SearchGroup',
  component: SearchGroup,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SearchGroup>;

const alertMessage = () => {
  document.getElementById('groupSearching')?.blur();
  alert(
    `
  죄송합니다. 
  검색 기능은 현재 준비중에 있습니다. 👀
  `
  );
};

export const Default: Story = {
  render: () => <SearchGroup handler={alertMessage} />,
};
