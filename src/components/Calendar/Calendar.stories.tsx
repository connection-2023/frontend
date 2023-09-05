import { StoryObj, Meta } from '@storybook/react';
import Calendar from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    selectedDates: [],
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: (args) => <Calendar {...args}></Calendar>,
};

export const Single: Story = {
  args: {
    selectedDates: [
      new Date(2023, 8, 4),
      new Date(2023, 8, 6),
      new Date(2023, 8, 8),
    ],
  },
};

export const Continuous: Story = {
  args: {
    selectedDates: [
      new Date(2023, 8, 18),
      new Date(2023, 8, 19),
      new Date(2023, 8, 20),
    ],
  },
};
