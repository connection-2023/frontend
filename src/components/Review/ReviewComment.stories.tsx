import { StoryObj, Meta } from '@storybook/react';
import ReviewComment from './ReviewComment';

const meta: Meta<typeof ReviewComment> = {
  title: 'Components/ReviewComment',
  component: ReviewComment,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    nickname: 'nickname',
    average: 4,
    content: '후기 350자 제한, 답글은 안다는걸로, 사진은 없는걸로',
    src: null,
    date: '2023.07.11',
    title: '가비쌤과 함께하는 왁킹 클래스',
  },
};

export default meta;
type Story = StoryObj<typeof ReviewComment>;

export const Default: Story = {
  render: (args) => <ReviewComment {...args} />,
};
