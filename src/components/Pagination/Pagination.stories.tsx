import Pagination from '../Pagination/Pagination';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      layout: 'centered',
      description: {
        component: '페이지네이션 컴포넌트',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    pageCount: {
      description: '페이지의 총 개수',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    currentPage: {
      description: '현재 페이지 번호',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    onPageChange: {
      description: '페이지 변경 시 호출되는 함수',
      action: 'page changed',
      table: {
        type: { summary: '(selectedItem: { selected: number }) => void' },
      },
    },
    marginPagesDisplayed: {
      description: '페이지 시작과 끝에 표시할 페이지 번호의 개수',
      control: 'number',
      defaultValue: { summary: 1 },
      table: {
        type: { summary: 'number' },
      },
    },
    pageRangeDisplayed: {
      description: '한 번에 표시할 페이지 번호의 범위',
      control: 'number',
      defaultValue: { summary: 3 },
      table: {
        type: { summary: 'number' },
      },
    },
  },
  args: {
    pageCount: 10,
    currentPage: 5,
    onPageChange: () => {},
    marginPagesDisplayed: 1,
    pageRangeDisplayed: 3,
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => <Pagination {...args} />,
};
