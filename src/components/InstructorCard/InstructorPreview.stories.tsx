import InstructorCard from './InstructorCard';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof InstructorCard> = {
  title: 'Components/InstructorPreview',
  component: InstructorCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '강사에 대한 정보 미리보기 컴포넌트',
      },
    },
  },

  argTypes: {
    id: {
      description: '강사 ID',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    imgURL: {
      description: '표시할 이미지들의 URL들이 담긴 배열',
      control: 'object',
      table: {
        type: { summary: 'string[]' },
      },
    },
    name: {
      description: '강사 이름',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    address: {
      description: '강의 지역',
      control: 'object',
      table: {
        type: { summary: 'string[]' },
      },
    },
    teamAffiliation: {
      description: '강사 소속',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    genres: {
      description: '댄스 장르',
      control: 'object',
      table: {
        type: { summary: 'string[]' },
      },
    },
    average: {
      description: '강사 평점',
      control: 'number',
      table: {
        type: { summary: 'number' },
      },
    },
    href: {
      description: '해당 카드 이동경로',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    largeImg: {
      description: '큰 이미지로 보기',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    isLiked: {
      description: '좋아요 여부',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
    likeEvent: {
      description: '좋아요 눌렀을 때 실행 함수',
      table: {
        type: { summary: '(id: string | number) => void' },
      },
    },
  },
  args: {
    id: 0,
    imgURL: [
      'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
    ],
    name: '이바다',
    address: ['서울 마포구'],
    teamAffiliation: '원밀리언즈',
    genres: ['방송댄스', '힙합', '탱고'],
    average: 3,
    href: '/',
    largeImg: false,
    isLiked: false,
    likeEvent: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof InstructorCard>;

export const Default: Story = {
  render: (args) => (
    <div className="h-60 w-80">
      <InstructorCard {...args} />
    </div>
  ),
};
