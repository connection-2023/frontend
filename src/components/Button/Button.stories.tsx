import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
  },
  render: (args) => <Button {...args}>Button</Button>,
};

export const Reset: Story = {
  args: {
    mode: 'reset',
  },
  render: (args) => <Button {...args}>초기화</Button>,
};

export const Large: Story = {
  args: {
    primary: true,
    size: 'large',
    mode: 'default',
  },
  render: (args) => <Button {...args}>Button</Button>,
};

export const Small: Story = {
  args: {
    size: 'small',
  },
  render: (args) => <Button {...args}>Button</Button>,
};
