import UserReview from './UserReview';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof UserReview> = {
  title: 'Components/Review/UserReview',
  component: UserReview,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component: '클래스/강사 페이지에서 사용자 리뷰를 표시하는 컴포넌트',
      },
    },
  },
  argTypes: {
    src: {
      description: '프로필 이미지 URL',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    nickname: {
      description: '닉네임',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    average: {
      description: '평점',
      control: { type: 'number', min: 0, max: 5, step: 0.1 },
      table: {
        type: { summary: 'number' },
      },
    },
    content: {
      description: '리뷰 내용',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    date: {
      description: '작성 날짜',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      description: '수강 클래스 제목',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    count: {
      description: '좋아요 개수',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    isLike: {
      description: '사용자가 좋아요를 눌렀는지 여부',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    reviewId: {
      description: '리뷰 ID',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    disabled: {
      description: '리뷰 좋아요 기능 활성화 여부',
      control: 'boolean',
      defaultValue: { summary: false },
      table: {
        type: { summary: 'boolean' },
      },
    },
    link: {
      description: '신고 링크',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    src: null,
    nickname: 'nickname',
    average: 4,
    content: '후기 350자 제한, 답글은 안다는걸로, 사진은 없는걸로',
    title: '가비쌤과 함께하는 왁킹 클래스',
    date: '2023.07.11',
    count: 2,
    isLike: false,
    reviewId: 0,
    link: `/report?lectureReviewId=${0}`,
  },
};

export default meta;
type Story = StoryObj<typeof UserReview>;

export const Default: Story = {
  render: (args) => <UserReview {...args} />,
};
