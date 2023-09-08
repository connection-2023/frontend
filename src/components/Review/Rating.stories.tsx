import { StoryObj, Meta } from '@storybook/react';
import Rating from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: () => <Rating />,
};
