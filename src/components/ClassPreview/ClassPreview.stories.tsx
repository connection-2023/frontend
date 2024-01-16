import { StoryObj, Meta } from '@storybook/react';
import ClassPreview from './ClassPreview';

const meta: Meta<typeof ClassPreview> = {
  title: 'Components/ClassPreview',
  component: ClassPreview,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    status: '모집중' as const,
    date: '08/04~09/25',
    title: '가비쌤과 함께하는 왁킹 클래스',
    location: ['서울 마포구'],
    genre: ['락킹', '락킹'],
    isLiked: true,
    type: '개인레슨',
    review: { average: 4.5, count: 14 },
    price: 80000,
    profile: { src: null, nickname: 'nickname' },
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

export const 모집중: Story = {
  render: (args) => <ClassPreview {...args} />,
};

export const 마감: Story = {
  args: {
    status: '마감' as const,
    date: '08/04~09/25',
    isLiked: true,
    title: '가비쌤과 함께하는 왁킹 클래스',
    location: ['서울 마포구', '서울 성동구'],
    genre: ['락킹'],
    type: '개인레슨',
    review: { average: 4, count: 12 },
    price: 80000,
    profile: { src: null, nickname: 'nickname' },
  },
};
