import { StoryObj, Meta } from '@storybook/react';
import SingleCalendar from './SingleCalendar';

const meta: Meta<typeof SingleCalendar> = {
  title: 'Components/Calendars/SingleCalendar',
  component: SingleCalendar,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof SingleCalendar>;

export const PreviewCalendar: Story = {
  args: {
    mode: 'schedule',
    clickableDates: [
      new Date(2023, 8, 4),
      new Date(2023, 8, 5),
      new Date(2023, 8, 6),
      new Date(2023, 8, 7),
      new Date(2023, 8, 8),
      new Date(2023, 8, 11),
      new Date(2023, 8, 12),
      new Date(2023, 8, 13),
      new Date(2023, 8, 14),
      new Date(2023, 8, 15),
      new Date(2023, 8, 20),
    ],
  },
  render: (args) => <SingleCalendar {...args} />,
};
