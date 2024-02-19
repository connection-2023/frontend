import ScheduleView from './ScheduleView';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof ScheduleView> = {
  title: 'Components/ScheduleView',
  component: ScheduleView,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '클래스 일정을 달력과 목록 형태로 보여주는 컴포넌트',
      },
    },
  },
  argTypes: {
    lectureSchedule: {
      description: '클래스 일정 배열',
      control: { type: 'object' },
      table: {
        type: { summary: 'IClassSchedule[] | Date[]' },
      },
    },
    maxCapacity: {
      description: '클래스 최대 인원',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
      },
    },
    duration: {
      description: '수업 시간',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
      },
    },
  },
  args: {
    lectureSchedule: [
      new Date(2024, 2, 1),
      new Date(2024, 2, 4),
      new Date(2024, 2, 6),
      new Date(2024, 2, 20),
    ],
    maxCapacity: 5,
    duration: 90,
  },
};

export default meta;
type Story = StoryObj<typeof ScheduleView>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-[40rem]">
      <ScheduleView {...args} />
    </div>
  ),
};
