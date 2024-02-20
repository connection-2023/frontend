import Button from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '기본으로 사용되는 버튼 컴포넌트',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: '버튼 크기',
      defaultValue: { summary: 'medium' },
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
    color: {
      description: '버튼 색상',
      defaultValue: { summary: 'default' },
      options: ['primary', 'default', 'secondary'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { color: 'default' },
  render: (args) => <Button {...args}>Button</Button>,
};

export const Primary: Story = {
  render: () => <Button color="primary">Button</Button>,
};

export const Secondary: Story = {
  render: () => (
    <Button color="secondary" size="large">
      Button
    </Button>
  ),
};
