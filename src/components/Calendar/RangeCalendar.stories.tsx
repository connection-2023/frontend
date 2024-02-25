import { useState } from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import RangeCalendar from './RangeCalendar';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof RangeCalendar> = {
  title: 'Components/Calendars/RangeCalendar',
  component: RangeCalendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `기간 선택 캘린더 
        \n - class: 수업 기간 지정 시 오늘 날짜 이후로 선택 가능한 캘린더 
        \n - income: 정산 요청 시 오늘 날짜까지 선택 가능한 캘린더`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      description: `기간 캘린더 모드 선택 \n - class: 현재 날짜 이후로 선택 가능 \n - income: 오늘 날짜까지 선택 가능`,
      options: ['class', 'income'],
      control: { type: 'radio' },
    },
    numberOfMonths: {
      description: '보여질 달력 개수',
      defaultValue: { summary: 2 },
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
      },
    },
    selectedRange: {
      description: '선택된 기간',
      control: { type: 'object' },
      table: {
        type: { summary: 'DateRange: {from: Date, to: Date} | undefined' },
      },
    },
    handleRangeSelect: {
      description: '선택된 기간을 상위 컴포넌트에 알려주는 함수',
      action: 'range selected',
      table: {
        type: { summary: 'SelectRangeEventHandler' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RangeCalendar>;

export const Default: Story = {
  args: {
    mode: 'class',
    selectedRange: undefined,
  },

  render: (args) => <RangeCalendar {...args} />,
};

const RangeCalendarWithState = (props: {
  mode: 'class' | 'income';
  selectedRange: DateRange | undefined;
  handleRangeSelect: SelectRangeEventHandler;
  numberOfMonths?: number;
}) => {
  const { selectedRange } = props;
  const [range, setRange] = useState<DateRange | undefined>(selectedRange);

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined,
  ) => {
    setRange(range);
  };

  return (
    <RangeCalendar
      {...props}
      selectedRange={selectedRange}
      handleRangeSelect={handleRangeSelect}
    />
  );
};

export const ClassRangeCalendar: Story = {
  args: {
    mode: 'class',
    selectedRange: undefined,
    numberOfMonths: 1,
  },
  render: (args) => <RangeCalendarWithState {...args} />,
};

export const IncomeRangeCalendar: Story = {
  args: {
    mode: 'income',
    selectedRange: undefined,
  },
  render: (args) => <RangeCalendarWithState {...args} />,
};
