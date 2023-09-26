import type { Meta, StoryObj } from '@storybook/react';
import Sharing from './Sharing';

const meta: Meta<typeof Sharing> = {
  title: 'Components/Sharing',
  component: Sharing,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      options: ['class', 'instructor'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sharing>;

export const Class: Story = {
  args: {
    mode: 'class',
    header: '가비쌤과 함께하는 왁킹 클래스',
  },
  render: (args) => <Sharing {...args}>Sharing</Sharing>,
};

export const Instructor: Story = {
  args: {
    mode: 'instructor',
    header: '리아킴',
  },
  render: (args) => <Sharing {...args}>초기화</Sharing>,
};
