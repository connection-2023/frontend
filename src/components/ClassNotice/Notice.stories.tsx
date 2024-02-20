import Notice from './Notice';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Notice> = {
  title: 'Components/Notice',
  component: Notice,
  parameters: {
    docs: {
      description: {
        component: `클래스 공지사항을 표시하고 수정할 수 있는 컴포넌트
        \n - 강사일 때 수정 모드로 전환 가능`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: '공지사항 내용',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    updateDate: {
      description: '마지막 업데이트 날짜',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    isEditMode: {
      description: '수정 모드 여부',
      defaultValue: { summary: false },
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    updateNotice: {
      description: '공지사항을 업데이트하는 API 함수',
      action: '공지사항 업데이트 API',
      table: {
        type: {
          summary: `(notification, value: string) => void;`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Notice>;

export const Default: Story = {
  args: {
    content: '중요한 공지사항!',
    updateDate: '2024-02-02',
  },
  render: (args) => <Notice {...args} />,
};
