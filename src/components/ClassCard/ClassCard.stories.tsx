import { StoryObj, Meta } from '@storybook/react';
import ClassCard from './ClassCard';

const meta: Meta<typeof ClassCard> = {
  title: 'Components/ClassCard',
  component: ClassCard,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    status: '모집중' as const,
    date: '08/04~09/25',
    title: '가비쌤과 함께하는 왁킹 클래스',
    location: ['서울 마포구'],
    genre: ['락킹', '락킹'],
    type: ['개인레슨', '단체레슨'],
    time: ['오전', '오후'],
    review: { average: 4.5, count: 14 },
    price: '80,000',
    profile: { src: undefined, nickname: 'nickname' },
    selectedDates: [
      new Date(2023, 8, 4),
      new Date(2023, 8, 6),
      new Date(2023, 8, 8),
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ClassCard>;

export const 모집중: Story = {
  render: (args) => <ClassCard {...args} />,
};

export const 마감임박: Story = {
  args: {
    status: '마감임박' as const,
    date: '08/04~09/25',
    title: '가비쌤과 함께하는 왁킹 클래스',
    location: ['서울 마포구', '서울 동작구'],
    genre: ['락킹', '락킹'],
    type: ['개인레슨'],
    time: ['오전'],
    review: { average: 4.5, count: 14 },
    price: '80,000',
    profile: { src: undefined, nickname: 'nickname' },
    selectedDates: [new Date()],
  },
};

export const 마감: Story = {
  args: {
    status: '마감' as const,
    date: '08/04~09/25',
    title: '가비쌤과 함께하는 왁킹 클래스',
    location: ['서울 마포구', '서울 성동구'],
    genre: ['락킹'],
    type: ['개인레슨', '단체레슨'],
    time: ['오전'],
    review: { average: 4, count: 12 },
    price: '80,000',
    profile: { src: undefined, nickname: 'nickname' },
    selectedDates: [new Date()],
  },
};
