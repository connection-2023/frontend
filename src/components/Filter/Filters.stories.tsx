import { StoryObj, Meta } from '@storybook/react';
import Filters from './Filters';

const meta: Meta<typeof Filters> = {
  title: 'Components/Filters',
  component: Filters,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    type: 'class',
  },
};

export default meta;
type Story = StoryObj<typeof Filters>;

export const Default: Story = {
  render: (args) => <Filters {...args} />,
};
