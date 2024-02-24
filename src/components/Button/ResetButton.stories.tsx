import { action } from '@storybook/addon-actions';
import ResetButton from './ResetButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ResetButton> = {
  title: 'Components/Buttons/ResetButton',
  component: ResetButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '초기화 버튼 컴포넌트',
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
    children: {
      description: '초기화 버튼 라벨',
      defaultValue: { summary: '초기화' },
      control: 'text',
    },
    onClick: {
      description: '버튼 클릭 시 실행 이벤트',
      onClick: action('on-click'),
    },
  },
};

export default meta;
type Story = StoryObj<typeof ResetButton>;

export const Reset: Story = {
  args: {
    size: 'medium',
    children: '초기화',
    onClick: action('초기화 버튼 클릭'),
  },
  render: (args) => <ResetButton {...args} />,
};
