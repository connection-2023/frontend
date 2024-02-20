import InstructorProfileMenu from './InstructorProfileMenu';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof InstructorProfileMenu> = {
  title: 'Components/Profile/ProfileMenu',
  component: InstructorProfileMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `강사 프로필 클릭 시 나타나는 드롭박스 옵션 메뉴 
        \n -강사의 프로필 보기, 채팅하기, 신고하기, 차단하기 옵션`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    profileSize: {
      description: '프로필 이미지 크기 지정',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      defaultValue: { summary: 'small' },
      control: { type: 'radio' },
    },
    profileImg: {
      description: `강사 프로필 사진 URL 
      \n - null일 시 기본 프로필 이미지 표시`,
      control: 'text',
      table: {
        type: { summary: 'string | null' },
      },
    },
    nickname: {
      description: '강사 닉네임',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    chatIcon: {
      description: '채팅 아이콘 표시 여부',
      control: 'boolean',
      defaultValue: { summary: 'true' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    instructorId: {
      description: `강사 ID 
      \n - 채팅하기, 신고하기 옵션을 선택했을 때 대상인 사용자 ID`,
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
      },
    },
  },
  args: {
    instructorId: 0,
    profileImg: null,
    nickname: '닉네임',
  },
};

export default meta;
type Story = StoryObj<typeof InstructorProfileMenu>;

export const Default: Story = {
  render: (args) => <InstructorProfileMenu {...args} />,
};
