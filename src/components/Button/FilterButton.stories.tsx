import FilterButton from './FilterButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FilterButton> = {
  title: 'Components/Buttons/FilterButton',
  component: FilterButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '클래스/강사 필터 버튼 컴포넌트',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      description: '버튼 라벨',
      defaultValue: { summary: '필터' },
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FilterButton>;

export const Filter: Story = {
  args: {
    label: '필터',
  },

  render: (args) => <FilterButton {...args} onClick={() => {}} />,
};
