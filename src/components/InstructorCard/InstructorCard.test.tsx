import { render, screen } from '@testing-library/react';
import InstructorCard from './InstructorCard';

describe('InstructorCard', () => {
  it('renders without crashing', () => {
    const mockdata = {
      id: 23,
      largeImg: true,
      name: '이바다',
      address: ['서울 마포구'],
      teamAffiliation: '원밀리언즈',
      genres: ['방송댄스', '힙합', '방송댄스'],
      imgURL: [
        'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      average: 3,
      href: '/',
      isLiked: true,
    };
    render(<InstructorCard {...mockdata} />);
  });

  it('img test', () => {
    const mockdata = {
      id: 23,
      largeImg: true,
      name: '이바다',
      address: ['서울 마포구'],
      teamAffiliation: '원밀리언즈',
      genres: ['방송댄스', '힙합', '방송댄스'],
      imgURL: [
        'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
        'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
      ],
      average: 3,
      href: '/',
      isLiked: true,
    };

    render(<InstructorCard {...mockdata} />);
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });
});
