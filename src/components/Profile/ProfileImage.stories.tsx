import ProfileImage from './ProfileImage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProfileImage> = {
  title: 'Components/ProfileImage',
  component: ProfileImage,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
      control: { type: 'radio' },
    },
    label: {
      control: 'boolean',
      defaultValue: true,
      table: {
        defaultValue: { summary: true },
      },
    },
    marginLeft: {
      control: { type: 'number' },
      table: {
        defaultValue: { summary: '1.5' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileImage>;

export const Small: Story = {
  args: {
    src: 'https://connection-bucket.s3.amazonaws.com/users/1698177348720_%C3%A1%C2%84%C2%90%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%81%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%BC%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B5.jpeg',
    nickname: '닉네임',
    size: 'small',
  },
  render: (args) => <ProfileImage {...args} />,
};

export const Medium: Story = {
  args: {
    src: 'https://connection-bucket.s3.amazonaws.com/users/1698177348720_%C3%A1%C2%84%C2%90%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%81%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%BC%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B5.jpeg',
    nickname: '닉네임',
    size: 'medium',
  },
  render: (args) => <ProfileImage {...args} />,
};

export const Large: Story = {
  args: {
    src: 'https://connection-bucket.s3.amazonaws.com/users/1698177348720_%C3%A1%C2%84%C2%90%C3%A1%C2%85%C2%A9%C3%A1%C2%84%C2%81%C3%A1%C2%85%C2%A2%C3%A1%C2%86%C2%BC%C3%A1%C2%84%C2%8B%C3%A1%C2%85%C2%B5.jpeg',
    nickname: '닉네임',
    size: 'large',
  },
  render: (args) => <ProfileImage {...args} />,
};
