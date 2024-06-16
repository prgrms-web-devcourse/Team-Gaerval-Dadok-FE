import { Meta, StoryObj } from '@storybook/react';
import Menu from '@/components/common/Menu';

const meta: Meta<typeof Menu> = {
  title: 'Common/Menu',
  component: Menu,
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Dropdown: Story = {
  render: () => {
    return (
      <div className="flex justify-end">
        <Menu>
          <Menu.Toggle />
          <Menu.DropdownList>
            <Menu.Item>수정하기</Menu.Item>
            <Menu.Item>삭제하기</Menu.Item>
          </Menu.DropdownList>
        </Menu>
      </div>
    );
  },
};

export const Bottomsheet: Story = {
  render: () => {
    return (
      <Menu>
        <Menu.Toggle />
        <Menu.BottomSheetList>
          <Menu.Item>수정하기</Menu.Item>
          <Menu.Item>삭제하기</Menu.Item>
        </Menu.BottomSheetList>
      </Menu>
    );
  },
};
