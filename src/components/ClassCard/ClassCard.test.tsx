import { render } from '@testing-library/react';
import ClassCard from './ClassCard';

describe('ClassCard', () => {
  it('renders without crashing', () => {
    const data = {
      status: '모집중' as const,
      date: '08/04~09/25',
      title: '가비쌤과 함께하는 왁킹 클래스',
      location: ['서울 마포구', '서울 마포구'],
      genre: ['락킹'],
      type: ['개인레슨'],
      time: ['오전'],
      review: { average: 4.5, count: 14 },
      price: '80,000',
      profile: { src: undefined, nickname: 'nickname' },
      selectedDates: [new Date()],
    };
    render(<ClassCard {...data} />);
  });
});
