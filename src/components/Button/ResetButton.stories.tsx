import ResetButton from './ResetButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ResetButton> = {
  title: 'Components/Buttons/ResetButton',
  component: ResetButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: '버튼 크기',
      defaultValue: { summary: 'medium' },
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResetButton>;

export const Reset: Story = {
  args: {},
  render: (args) => (
    <ResetButton {...args} onClick={() => {}}>
      초기화
    </ResetButton>
  ),
};
