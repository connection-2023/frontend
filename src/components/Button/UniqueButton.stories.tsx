import UniqueButton from './UniqueButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UniqueButton> = {
  title: 'Components/Buttons/UniqueButton',
  component: UniqueButton,
  parameters: {},
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
      defaultValue: { summary: 'primary' },
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UniqueButton>;

export const Primary: Story = {
  args: {},
  render: (args) => <UniqueButton {...args}>버튼</UniqueButton>,
};

export const Secondary: Story = {
  render: () => <UniqueButton color="secondary">버튼</UniqueButton>,
};
