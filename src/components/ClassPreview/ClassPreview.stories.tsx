import ClassPreview from './ClassPreview';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof ClassPreview> = {
  title: 'Components/ClassPreview',
  component: ClassPreview,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component: '클래스에 대한 정보 미리보기 컴포넌트',
      },
    },
  },
  argTypes: {
    id: {
      description: '클래스 ID',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    status: {
      description: '클래스 상태',
      options: ['모집중', '마감'],
      control: { type: 'radio' },
      table: {
        type: { summary: '모집중 | 마감' },
      },
    },
    date: {
      description: '클래스 전체 진행 기간',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      description: '클래스 제목',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    imgURL: {
      description: '클래스 이미지',
      control: 'object',
      table: {
        type: { summary: 'string[]' },
      },
    },
    location: {
      description: '클래스 장소',
      control: 'object',
      table: {
        type: { summary: 'string[]' },
      },
    },
    genre: {
      description: '클래스 장르',
      control: 'object',
      table: {
        type: { summary: 'string[]' },
      },
    },
    type: {
      description: '클래스 타입',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    review: {
      description: '클래스 리뷰',
      control: 'object',
      table: {
        type: { summary: '{ average: number; count: number }' },
      },
    },
    price: {
      description: '클래스 가격',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    profile: {
      description: '강사 프로필',
      control: 'object',
      table: {
        type: {
          summary: '{ src: string | null; nickname: string; id: number }',
        },
      },
    },
    isLiked: {
      description: '클래스 좋아요 표시 여부',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    smallView: {
      description: '뷰포트에 따른 반응형 디자인',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    status: '모집중' as const,
    date: '08/04~09/25',
    title: '가비쌤과 함께하는 왁킹 클래스',
    location: ['서울 마포구'],
    genre: ['락킹', 'K-pop'],
    isLiked: false,
    type: '개인레슨',
    review: { average: 4.5, count: 14 },
    price: 80000,
    profile: { src: null, nickname: 'nickname', id: 1 },
    imgURL: [
      'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ClassPreview>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-[40rem]">
      <ClassPreview {...args} />
    </div>
  ),
};
