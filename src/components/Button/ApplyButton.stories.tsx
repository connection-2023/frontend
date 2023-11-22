import ApplyButton from './ApplyButton';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ApplyButton> = {
  title: 'Components/Buttons/ApplyButton',
  component: ApplyButton,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: '버튼 라벨',
      defaultValue: { summary: '신청하기' },
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ApplyButton>;

export const Apply: Story = {
  args: {
    label: '신청하기',
  },
  render: (args) => <ApplyButton {...args} onClick={() => {}} />,
};
