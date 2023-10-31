import { StoryObj, Meta } from '@storybook/react';
import UserReview from './UserReview';

const meta: Meta<typeof UserReview> = {
  title: 'Components/UserReview',
  component: UserReview,
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
type Story = StoryObj<typeof UserReview>;

export const Default: Story = {
  render: (args) => <UserReview {...args} />,
};
