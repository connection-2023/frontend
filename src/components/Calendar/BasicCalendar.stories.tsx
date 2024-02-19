import { action } from '@storybook/addon-actions';
import BasicCalendar from './BasicCalendar';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof BasicCalendar> = {
  title: 'Components/Calendars/BasicCalendar',
  component: BasicCalendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `기본 캘린더 
        \n - preview: 읽기 전용 모드 캘린더 
        \n - filter: 필터에서 사용되는 날짜 선택 가능한 캘린더
        \n - dayoff: 선택 가능한 날짜(selectableDates)에서 특정 날짜를 제외할 수 있는 캘린더`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      description: `캘린더 모드 선택 \n - preview: 읽기 전용 모드 캘린더 \n - filter: 필터에서 사용되는 날짜 선택 가능한 캘린더 \n - dayoff: 선택 가능한 날짜(selectableDates)에서 특정 날짜를 제외할 수 있는 캘린더`,
      options: ['preview', 'filter', 'dayoff'],
      control: { type: 'radio' },
    },
    selectableDates: {
      description: '선택 가능한 날짜',
      control: { type: 'object' },
      table: {
        type: { summary: 'Date[]' },
      },
    },
    selectedDates: {
      description: '선택된 날짜',
      control: { type: 'object' },
      defaultValue: { summary: 'selectableDates' },
      table: {
        type: { summary: 'Date[]' },
      },
    },
    handleSelected: {
      description: '선택된 날짜를 상위 컴포넌트에 알려주는 함수',
      action: 'selected',
      table: {
        type: { summary: '(value: Date[]) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BasicCalendar>;

export const PreviewCalendar: Story = {
  args: {
    mode: 'preview',
    selectableDates: [
      new Date(2024, 2, 4),
      new Date(2024, 2, 10),
      new Date(2024, 2, 20),
    ],
    handleSelected: action('selectedDates'),
  },
  render: (args) => <BasicCalendar {...args} />,
};

export const FilterCalendar: Story = {
  args: {
    mode: 'filter',
    handleSelected: action('selectedDates'),
  },
  render: (args) => <BasicCalendar {...args} />,
};

export const DayoffCalendar: Story = {
  args: {
    mode: 'dayoff',
    selectableDates: [
      new Date(2024, 2, 4),
      new Date(2024, 2, 10),
      new Date(2024, 2, 15),
      new Date(2024, 2, 20),
    ],
    handleSelected: action('selectedDates'),
  },
  render: (args) => <BasicCalendar {...args} />,
};
