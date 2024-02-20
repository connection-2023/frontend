import StatusButton from './StatusButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StatusButton> = {
  title: 'Components/Buttons/StatusButton',
  component: StatusButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '상태에 따른 활성화/비활성화 버튼 컴포넌트',
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
    disabled: {
      description: '버튼 비활성화 여부',
      defaultValue: { summary: true },
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    children: {
      description: '버튼 라벨',
      defaultValue: { summary: '버튼 라벨' },
      control: 'text',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusButton>;

export const Default: Story = {
  args: {
    children: <p className="px-2">상태 버튼</p>,
    disabled: false,
    size: 'medium',
  },

  render: (args) => <StatusButton {...args} />,
};
