import { StoryObj, Meta } from '@storybook/react';
import InteractionCalendar from './InteractionCalendar';

const meta: Meta<typeof InteractionCalendar> = {
  title: 'Components/InteractionCalendar',
  component: InteractionCalendar,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof InteractionCalendar>;

export const Default: Story = {
  render: () => <InteractionCalendar />,
};
