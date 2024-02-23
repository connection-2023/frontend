import ReviewStatistics from './ReviewStatistics';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof ReviewStatistics> = {
  title: 'Components/Review/ReviewStatistics',
  component: ReviewStatistics,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '리뷰의 별점 정보를 담고 있는 객체의 배열로부터 평균 평점과 각 별점에 해당하는 리뷰의 개수를 표시하는 컴포넌트',
      },
    },
  },
  argTypes: {
    reviewList: {
      description:
        '리뷰의 별점 정보를 담고 있는 객체의 배열로부터 전체 평균 별점과 각 별점에 해당하는 개수 계산',
      control: { type: 'object' },
      table: {
        type: { summary: '{ stars: number }[]' },
      },
    },
  },
  args: {
    reviewList: [
      { stars: 1 },
      { stars: 3 },
      { stars: 3 },
      { stars: 4 },
      { stars: 5 },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ReviewStatistics>;

export const Default: Story = {
  render: (args) => <ReviewStatistics {...args} />,
};
