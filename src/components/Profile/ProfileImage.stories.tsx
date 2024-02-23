import ProfileImage from './ProfileImage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProfileImage> = {
  title: 'Components/Profile/ProfileImage',
  component: ProfileImage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '기본 프로필 이미지 컴포넌트',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: '버튼 크기',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      control: { type: 'radio' },
    },
    src: {
      description: `프로필 사진 URL 
      \n - null일 시 기본 프로필 이미지 표시`,
      control: 'text',
      table: {
        type: { summary: 'string | null' },
      },
    },
    nickname: {
      description: '닉네임',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      description: '닉네임 표시 여부',
      control: 'boolean',
      defaultValue: { summary: 'true' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    marginLeft: {
      description: '프로필 사진과 닉네임 간격',
      control: { type: 'number' },
      defaultValue: { summary: '1.5' },
      table: {
        type: { summary: 'number' },
      },
    },
  },
  args: {
    src: 'https://connection-bucket.s3.amazonaws.com/users/1698177348720_%C3%A1%C2%84%C2%90%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%81%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%BC%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B5.jpeg',
    nickname: '닉네임',
    size: 'small',
  },
};

export default meta;
type Story = StoryObj<typeof ProfileImage>;

export const Default: Story = {
  render: (args) => <ProfileImage {...args} />,
};
