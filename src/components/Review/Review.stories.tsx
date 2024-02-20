import Review from './Review';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof Review> = {
  title: 'Components/Review/Review',
  component: Review,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '강사 또는 클래스의 평균 평점과 리뷰 개수를 표시하는 컴포넌트',
      },
    },
  },
  argTypes: {
    average: {
      description: '평균 평점(소수점 첫번째 자리까지)',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
      },
    },
    count: {
      description: '리뷰 개수',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
      },
    },
    size: {
      description: '별 크기',
      options: ['regular', 'small'],
      defaultValue: { summary: 'regular' },
      control: { type: 'radio' },
    },
  },
  args: {
    average: 3.3,
    count: 17,
  },
};

export default meta;
type Story = StoryObj<typeof Review>;

export const Default: Story = {
  render: (args) => <Review {...args} />,
};
