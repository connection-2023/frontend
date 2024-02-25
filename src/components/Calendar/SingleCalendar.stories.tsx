import SingleCalendar from './SingleCalendar';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof SingleCalendar> = {
  title: 'Components/Calendars/SingleCalendar',
  component: SingleCalendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `단일 선택 캘린더 
        \n - schedule: 기본 캘린더(수업 일정) 보기 
        \n - dashboard: 일정이 있는 날짜에 점 표시되는 캘린더 
        \n - specific: 특정 날짜를 선택할 수 있는 캘린더`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      description: `캘린더 모드 선택 \n - schedule: 기본 캘린더(수업 일정) 보기 \n - dashboard: 일정이 있는 날짜에 점 표시되는 캘린더 \n - specific: 특정 날짜를 선택할 수 있는 캘린더`,
      options: ['schedule', 'dashboard', 'specific'],
      control: { type: 'radio' },
    },
    clickableDates: {
      description: '선택 가능한 날짜',
      control: { type: 'object' },
      table: {
        type: { summary: 'Date[]' },
      },
    },
    handleClickDate: {
      description: '선택된 날짜를 상위 컴포넌트에 알려주는 함수',
      action: 'selected',
      table: {
        type: { summary: '(newDate: Date | undefined) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SingleCalendar>;

export const ScheduleCalendar: Story = {
  args: {
    mode: 'schedule',
    clickableDates: [
      new Date(2024, 2, 4),
      new Date(2024, 2, 5),
      new Date(2024, 2, 6),
      new Date(2024, 2, 7),
      new Date(2024, 2, 8),
      new Date(2024, 2, 11),
      new Date(2024, 2, 12),
      new Date(2024, 2, 13),
      new Date(2024, 2, 14),
      new Date(2024, 2, 15),
      new Date(2024, 2, 20),
    ],
  },
  render: (args) => <SingleCalendar {...args} />,
};

export const DashboardCalendar: Story = {
  args: {
    mode: 'dashboard',
    clickableDates: [
      new Date(2024, 2, 4),
      new Date(2024, 2, 7),
      new Date(2024, 2, 8),
      new Date(2024, 2, 11),
      new Date(2024, 2, 12),
      new Date(2024, 2, 14),
      new Date(2024, 2, 20),
    ],
  },
  render: (args) => <SingleCalendar {...args} />,
};

export const SpecificCalendar: Story = {
  args: {
    mode: 'specific',
    clickableDates: [
      new Date(2024, 2, 4),
      new Date(2024, 2, 5),
      new Date(2024, 2, 6),
      new Date(2024, 2, 7),
      new Date(2024, 2, 8),
      new Date(2024, 2, 11),
      new Date(2024, 2, 12),
      new Date(2024, 2, 13),
      new Date(2024, 2, 14),
      new Date(2024, 2, 15),
      new Date(2024, 2, 20),
    ],
  },
  render: (args) => <SingleCalendar {...args} />,
};
