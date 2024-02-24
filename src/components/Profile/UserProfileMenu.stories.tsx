import UserProfileMenu from './UserProfileMenu';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UserProfileMenu> = {
  title: 'Components/Profile/UserProfileMenu',
  component: UserProfileMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `유저 프로필 클릭 시 나타나는 드롭박스 옵션 메뉴 
        \n -유저의 연락처 복사, 채팅하기, 신고하기, 차단하기 옵션`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    contact: {
      description: `유저 연락처 
      \n - 연락처 복사 옵션을 선택했을 때 클립보드에 복사`,
      control: { type: 'number' },
    },

    profileImg: {
      description: `유저의 프로필 이미지 URL 
      \n - null일 시 기본 프로필 이미지 표시`,
      control: 'text',
      table: {
        type: { summary: 'string | null' },
      },
    },
    name: {
      description: '유저 이름',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    nameWidth: {
      description: '이름 표시 영역의 너비 지정',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    userId: {
      description: `유저 ID 
        \n - 채팅하기, 신고하기 옵션을 선택했을 때 대상인 사용자 ID`,
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
      },
    },
  },
  args: {
    contact: '01012341234',
    userId: 0,
    profileImg: null,
    name: '이름',
    nameWidth: 0,
  },
};

export default meta;
type Story = StoryObj<typeof UserProfileMenu>;

export const Default: Story = {
  render: (args) => <UserProfileMenu {...args} />,
};
