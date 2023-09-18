import { StoryObj, Meta } from '@storybook/react';
import BasicCalendar from './BasicCalendar';

const meta: Meta<typeof BasicCalendar> = {
  title: 'Components/BasicCalendar',
  component: BasicCalendar,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof BasicCalendar>;

export const PreviewCalendar: Story = {
  args: {
    mode: 'preview',
    selectedDates: [
      new Date(2023, 8, 4),
      new Date(2023, 8, 6),
      new Date(2023, 8, 8),
    ],
  },
  render: (args) => <BasicCalendar {...args} />,
};

export const FilterCalendar: Story = {
  args: {
    mode: 'filter',
  },
  render: (args) => <BasicCalendar {...args} />,
};
