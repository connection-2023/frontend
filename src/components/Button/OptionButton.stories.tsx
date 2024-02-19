import OptionButtons from './OptionButtons';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof OptionButtons> = {
  title: 'Components/Buttons/OptionButtons',
  component: OptionButtons,
  parameters: {
    layout: 'centered',
    parameters: {
      layout: 'centered',
      docs: {
        description: {
          component:
            '클래스/강사 상세페이지에서 사용되는 공유하기, 신고하기, 차단하기 옵션의 옵션 버튼 컴포넌트',
        },
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: '공유하기 제목',
      defaultValue: { summary: 'Connection 댄스 클래스' },
      control: 'text',
    },
    lecturerId: {
      description: '클래스 및 강사 신고/차단 시 강사 id',
      defaultValue: { summary: 1 },
      control: 'number',
    },
    mode: {
      description: 'mode',
      defaultValue: { summary: '공유하기 모드' },
      options: ['class', 'instructor'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OptionButtons>;

export const Default: Story = {
  args: {
    mode: 'class',
    title: 'Connection 댄스 클래스',
    lecturerId: 1,
  },

  render: (args) => <OptionButtons {...args} />,
};
