import { StoryObj, Meta } from '@storybook/react';
import Review from './Review';

const meta: Meta<typeof Review> = {
  title: 'Components/Review',
  component: Review,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    average: 3,
    count: 17,
  },
};

export default meta;
type Story = StoryObj<typeof Review>;

export const Default: Story = {
  render: (args) => <Review {...args} />,
};

export const Int: Story = {
  args: {
    average: 2,
    count: 17,
  },
};

export const Double: Story = {
  args: {
    average: 3.4,
    count: 17,
  },
};
