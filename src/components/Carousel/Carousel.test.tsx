import { render, screen } from '@testing-library/react';
import Carousel from './Carousel';

describe('Carousel', () => {
  const mockImgURL = [
    'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
    'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
    'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
    'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
    'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
  ];

  it('focus 전용일때 캐러셀 렌더', () => {
    render(<Carousel move={false} imgURL={mockImgURL} priority={1} />);
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('move auto로 움직일때 캐러셀 렌더', () => {
    render(<Carousel move={true} imgURL={mockImgURL} priority={2} />);
    expect(screen.getAllByRole('img')).toHaveLength(7);
  });
});
